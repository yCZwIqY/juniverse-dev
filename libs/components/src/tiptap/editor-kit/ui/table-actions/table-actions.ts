import type { Editor } from '@tiptap/react';

/** 표 관련 메뉴 항목 하나 (툴바 드롭다운·우클릭 메뉴가 함께 쓴다) */
export interface TableAction {
  label: string;
  run: (editor: Editor) => void;
  /** 지정하지 않으면 표 안에 커서가 있을 때 항상 활성 */
  can?: (editor: Editor) => boolean;
}

export const MERGE_CELLS_ACTION: TableAction = {
  label: '셀 병합',
  run: (e) => e.chain().focus().mergeCells().run(),
  can: (e) => e.can().mergeCells(),
};

/**
 * 병합을 되돌린다.
 * prosemirror-tables 의 `splitCell` 은 colspan/rowspan 이 1 보다 큰 셀에서만 동작하므로
 * `can()` 이 곧 "병합된 셀인가" 판정이 된다. 병합되지 않은 셀을 나누는 것은 '셀 분할'
 * (splitCellIntoGrid) 이 담당한다.
 */
export const UNMERGE_CELLS_ACTION: TableAction = {
  label: '셀 병합 되돌리기',
  run: (e) => e.chain().focus().splitCell().run(),
  can: (e) => e.can().splitCell(),
};

/** '셀 분할' 은 개수 입력 팝업이 필요해 각 UI 에서 따로 렌더링한다. */
export const CELL_ACTIONS: TableAction[] = [
  MERGE_CELLS_ACTION,
  UNMERGE_CELLS_ACTION,
];

/** '셀 분할' 메뉴 라벨. run 은 팝업이 필요해 각 UI 가 담당하고 라벨/활성 조건만 공유한다. */
export const SPLIT_CELL_LABEL = '셀 분할';

/**
 * '셀 분할' 활성 여부.
 * `splitCellIntoGrid` 는 대상 셀이 하나로 정해질 때만 동작하므로, 여러 셀을 선택한
 * 상태이거나 표 밖이면 false 가 된다.
 */
export function canSplitCell(editor: Editor): boolean {
  try {
    return editor.can().splitCellIntoGrid({ rows: 1, cols: 2 });
  } catch {
    return false;
  }
}

export const ROW_ACTIONS: TableAction[] = [
  {
    label: '위에 행 추가',
    run: (e) => e.chain().focus().addRowBefore().run(),
    can: (e) => e.can().addRowBefore(),
  },
  {
    label: '아래에 행 추가',
    run: (e) => e.chain().focus().addRowAfter().run(),
    can: (e) => e.can().addRowAfter(),
  },
  {
    label: '행 삭제',
    run: (e) => e.chain().focus().deleteRow().run(),
    can: (e) => e.can().deleteRow(),
  },
];

export const COL_ACTIONS: TableAction[] = [
  {
    label: '왼쪽에 열 추가',
    run: (e) => e.chain().focus().addColumnBefore().run(),
    can: (e) => e.can().addColumnBefore(),
  },
  {
    label: '오른쪽에 열 추가',
    run: (e) => e.chain().focus().addColumnAfter().run(),
    can: (e) => e.can().addColumnAfter(),
  },
  {
    label: '열 삭제',
    run: (e) => e.chain().focus().deleteColumn().run(),
    can: (e) => e.can().deleteColumn(),
  },
];

export const PROP_ACTIONS: TableAction[] = [
  {
    label: '헤더 행 토글',
    run: (e) => e.chain().focus().toggleHeaderRow().run(),
    can: (e) => e.can().toggleHeaderRow(),
  },
  {
    label: '헤더 열 토글',
    run: (e) => e.chain().focus().toggleHeaderColumn().run(),
    can: (e) => e.can().toggleHeaderColumn(),
  },
  {
    label: '헤더 셀 토글',
    run: (e) => e.chain().focus().toggleHeaderCell().run(),
    can: (e) => e.can().toggleHeaderCell(),
  },
];

export const DELETE_TABLE_ACTION: TableAction = {
  label: '표 삭제',
  run: (e) => e.chain().focus().deleteTable().run(),
  can: (e) => e.can().deleteTable(),
};

/** 액션 활성 여부. `can` 이 없으면 항상 활성으로 본다. */
export function isActionEnabled(action: TableAction, editor: Editor): boolean {
  try {
    return action.can ? action.can(editor) : true;
  } catch {
    // can() 이 표 밖에서 던지는 경우가 있어 방어한다.
    return false;
  }
}
