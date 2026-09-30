import { Extension } from '@tiptap/core';
import type { Node as PMNode } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import { TextSelection } from '@tiptap/pm/state';
import { CellSelection, TableMap, cellAround } from '@tiptap/pm/tables';

/** 한 번에 나눌 수 있는 최대 행/열 수 */
export const MAX_SPLIT_COUNT = 20;

/** 나눈 결과 격자가 이보다 커지면 실행하지 않는다 (오조작 방어) */
const MAX_RESULT_WIDTH = 100;
const MAX_RESULT_HEIGHT = 200;

export interface SplitCellIntoGridOptions {
  /** 나눌 행 개수 @default 1 */
  rows?: number;
  /** 나눌 열 개수 @default 1 */
  cols?: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableCellSplit: {
      /**
       * 현재 커서가 놓인 셀 하나를 rows × cols 로 나눈다.
       *
       * prosemirror-tables 의 `splitCell` 은 colspan/rowspan 이 1 인 셀에서 항상 false 를
       * 반환하므로(= 병합 해제 전용) 병합된 적 없는 셀은 나눌 수 없다. 이 커맨드는 한글(HWP)
       * 의 "셀 나누기"처럼 표 격자 자체를 잘게 쪼개서 초기 상태의 1×1 셀도 나눌 수 있게 한다.
       */
      splitCellIntoGrid: (options?: SplitCellIntoGridOptions) => ReturnType;
    };
  }
}

/** 스케일된 격자 좌표계 위에 놓인 셀 하나 */
interface ScaledCell {
  /** 속성·타입·내용을 가져올 원본 셀 */
  source: PMNode;
  /** 원본 내용 대신 빈 셀로 만들지 여부 (나눠진 조각 중 첫 조각을 뺀 나머지) */
  empty: boolean;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function normalizeCount(value: number | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 1;
  return Math.min(MAX_SPLIT_COUNT, Math.max(1, Math.floor(value)));
}

function sortedUnique(values: number[]): number[] {
  return [...new Set(values)].sort((a, b) => a - b);
}

/**
 * 선택 영역이 가리키는 셀 하나의 위치를 찾는다.
 * 여러 셀이 선택된 CellSelection 은 대상이 모호하므로 지원하지 않는다.
 */
function findSingleCell(state: EditorState) {
  const { selection } = state;
  if (selection instanceof CellSelection) {
    if (selection.$anchorCell.pos !== selection.$headCell.pos) return null;
    return selection.$anchorCell;
  }
  return cellAround(selection.$from);
}

/**
 * 셀 분할의 핵심.
 *
 * 1. 열 좌표에 cols, 행 좌표에 rows 를 곱해 격자를 잘게 쪼갠다. 이러면 대상 셀의 폭/높이가
 *    각각 cols/rows 로 정확히 나누어떨어지므로 조각을 정수 좌표로 배치할 수 있다.
 * 2. 대상 셀을 rows × cols 조각으로 교체한다.
 * 3. 실제로 어떤 셀의 모서리가 놓인 경계만 남기고 나머지 격자선을 걷어낸다(압축).
 *    이 과정에서 다른 행/열의 셀은 자연스럽게 colspan/rowspan 이 늘어나 표 모양이 유지된다.
 *
 * 변환을 단계별로 적용하는 대신 표 노드 전체를 다시 만들어 한 번에 교체한다.
 * 중간 상태의 격자가 깨질 여지가 없어 병합된 셀이 섞인 표에서도 안전하다.
 */
function splitCellIntoGrid(
  state: EditorState,
  tr: Transaction,
  dispatch: ((tr: Transaction) => void) | undefined,
  options: SplitCellIntoGridOptions,
): boolean {
  const rowScale = normalizeCount(options.rows);
  const colScale = normalizeCount(options.cols);
  if (rowScale * colScale <= 1) return false;

  const $cell = findSingleCell(state);
  if (!$cell) return false;

  const table = $cell.node(-1);
  if (table?.type.spec.tableRole !== 'table') return false;

  const tableStart = $cell.start(-1);
  const map = TableMap.get(table);
  const targetPos = $cell.pos - tableStart;
  const targetNode = table.nodeAt(targetPos);
  if (!targetNode) return false;
  const target = map.findCell(targetPos);

  // --- 1) 기존 셀을 스케일된 좌표계로 옮기면서 열 폭 정보도 모은다 ---

  const cells: ScaledCell[] = [];
  const originColWidth = new Array<number>(map.width).fill(0);
  const visited = new Set<number>();

  for (const pos of map.map) {
    if (visited.has(pos)) continue;
    visited.add(pos);

    const node = table.nodeAt(pos);
    if (!node) return false;
    const rect = map.findCell(pos);

    const colwidth = node.attrs.colwidth as number[] | null;
    if (colwidth) {
      for (let i = 0; i < colwidth.length; i++) {
        const col = rect.left + i;
        if (colwidth[i] > 0 && col < map.width && !originColWidth[col]) {
          originColWidth[col] = colwidth[i];
        }
      }
    }

    // 대상 셀은 아래에서 조각으로 나눠 넣는다.
    if (pos === targetPos) continue;

    cells.push({
      source: node,
      empty: false,
      left: rect.left * colScale,
      right: rect.right * colScale,
      top: rect.top * rowScale,
      bottom: rect.bottom * rowScale,
    });
  }

  // --- 2) 대상 셀을 rows × cols 조각으로 교체 ---

  // 스케일 덕분에 조각 하나의 크기가 항상 정수가 된다.
  const pieceWidth = target.right - target.left;
  const pieceHeight = target.bottom - target.top;
  const originLeft = target.left * colScale;
  const originTop = target.top * rowScale;

  for (let row = 0; row < rowScale; row++) {
    for (let col = 0; col < colScale; col++) {
      const left = originLeft + col * pieceWidth;
      const top = originTop + row * pieceHeight;
      cells.push({
        source: targetNode,
        // 원래 내용은 첫 조각에만 남기고 나머지는 빈 셀로 만든다.
        empty: row !== 0 || col !== 0,
        left,
        right: left + pieceWidth,
        top,
        bottom: top + pieceHeight,
      });
    }
  }

  // --- 3) 실제로 쓰이는 격자선만 남긴다 ---

  const colEdges = sortedUnique([
    0,
    map.width * colScale,
    ...cells.flatMap((cell) => [cell.left, cell.right]),
  ]);
  const rowEdges = sortedUnique([
    0,
    map.height * rowScale,
    ...cells.flatMap((cell) => [cell.top, cell.bottom]),
  ]);

  const nextWidth = colEdges.length - 1;
  const nextHeight = rowEdges.length - 1;
  if (nextWidth > MAX_RESULT_WIDTH || nextHeight > MAX_RESULT_HEIGHT)
    return false;

  const colIndex = new Map(colEdges.map((edge, index) => [edge, index]));
  const rowIndex = new Map(rowEdges.map((edge, index) => [edge, index]));

  // 압축된 열마다 원래 폭을 다시 배분한다. (모두 0 이면 colwidth 미지정 상태를 유지)
  const nextColWidth = new Array<number>(nextWidth).fill(0);
  for (let col = 0; col < nextWidth; col++) {
    let sum = 0;
    for (let scaled = colEdges[col]; scaled < colEdges[col + 1]; scaled++) {
      sum += originColWidth[Math.floor(scaled / colScale)] / colScale;
    }
    nextColWidth[col] = Math.round(sum);
  }

  // --- 4) 표 노드를 다시 만든다 ---

  const buckets: { order: number; node: PMNode }[][] = Array.from(
    { length: nextHeight },
    () => [],
  );

  for (const cell of cells) {
    const left = colIndex.get(cell.left);
    const right = colIndex.get(cell.right);
    const top = rowIndex.get(cell.top);
    const bottom = rowIndex.get(cell.bottom);
    if (left == null || right == null || top == null || bottom == null)
      return false;

    const colwidth = nextColWidth.slice(left, right);
    const attrs = {
      ...cell.source.attrs,
      colspan: right - left,
      rowspan: bottom - top,
      colwidth: colwidth.some((width) => width > 0) ? colwidth : null,
    };

    const node = cell.empty
      ? cell.source.type.createAndFill(attrs)
      : cell.source.type.create(attrs, cell.source.content, cell.source.marks);
    if (!node) return false;

    buckets[top].push({ order: left, node });
  }

  const nextRows: PMNode[] = [];
  for (let row = 0; row < nextHeight; row++) {
    // 새 행은 기존 행을 잘게 쪼갠 것이므로, 그 위치를 포함하던 원본 행의 타입/속성을 물려받는다.
    const originRow = table.child(
      Math.min(Math.floor(rowEdges[row] / rowScale), table.childCount - 1),
    );
    const rowCells = buckets[row]
      .sort((a, b) => a.order - b.order)
      .map((entry) => entry.node);
    nextRows.push(
      originRow.type.create(originRow.attrs, rowCells, originRow.marks),
    );
  }

  const nextTable = table.type.create(table.attrs, nextRows, table.marks);

  if (dispatch) {
    const tableFrom = tableStart - 1;
    tr.replaceWith(tableFrom, tableFrom + table.nodeSize, nextTable);

    // 커서를 나눠진 첫 조각 안으로 옮긴다.
    const nextMap = TableMap.get(nextTable);
    const firstRow = rowIndex.get(originTop);
    const firstCol = colIndex.get(originLeft);
    if (firstRow != null && firstCol != null) {
      const cellPos = nextMap.map[firstRow * nextMap.width + firstCol];
      tr.setSelection(
        TextSelection.near(tr.doc.resolve(tableStart + cellPos + 1)),
      );
    }
    dispatch(tr.scrollIntoView());
  }

  return true;
}

/** 병합되지 않은 셀도 나눌 수 있게 해주는 `splitCellIntoGrid` 커맨드를 추가한다. */
export const TableCellSplit = Extension.create({
  name: 'tableCellSplit',

  addCommands() {
    return {
      splitCellIntoGrid:
        (options: SplitCellIntoGridOptions = {}) =>
        ({ state, tr, dispatch }) =>
          splitCellIntoGrid(state, tr, dispatch, options),
    };
  },
});
