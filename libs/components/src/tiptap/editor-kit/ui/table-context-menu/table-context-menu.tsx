'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type { Editor } from '@tiptap/react';
import { CellSelection } from '@tiptap/pm/tables';
import {
  CELL_ACTIONS,
  COL_ACTIONS,
  DELETE_TABLE_ACTION,
  PROP_ACTIONS,
  ROW_ACTIONS,
  SPLIT_CELL_LABEL,
  type TableAction,
  canSplitCell,
  isActionEnabled,
} from '../table-actions';
import {
  type SplitCounts,
  TableSplitDialog,
} from '../table-split-dialog/table-split-dialog';

import './table-context-menu.scss';

/** 뷰포트 밖으로 나가지 않도록 남겨둘 여백 */
const VIEWPORT_MARGIN = 8;

interface MenuState {
  x: number;
  y: number;
  /**
   * 메뉴를 연 시점의 항목별 활성 여부.
   * 열려 있는 동안 에디터 선택이 바뀌어도 메뉴가 흔들리지 않도록 고정한다.
   */
  enabled: Record<string, boolean>;
}

type MenuEntry =
  | { kind: 'separator' }
  | { kind: 'action'; action: TableAction; danger?: boolean };

/** '셀 분할' 뒤에 이어지는 항목들 (셀 액션은 CELL_ACTIONS 로 먼저 렌더링한다) */
const MENU_ENTRIES: MenuEntry[] = [
  { kind: 'separator' },
  ...ROW_ACTIONS.map((action) => ({ kind: 'action' as const, action })),
  { kind: 'separator' },
  ...COL_ACTIONS.map((action) => ({ kind: 'action' as const, action })),
  { kind: 'separator' },
  ...PROP_ACTIONS.map((action) => ({ kind: 'action' as const, action })),
  { kind: 'separator' },
  { kind: 'action', action: DELETE_TABLE_ACTION, danger: true },
];

const ALL_ACTIONS: TableAction[] = [
  ...CELL_ACTIONS,
  ...MENU_ENTRIES.flatMap((entry) =>
    entry.kind === 'action' ? [entry.action] : [],
  ),
];

function snapshotEnabled(editor: Editor): Record<string, boolean> {
  return {
    ...Object.fromEntries(
      ALL_ACTIONS.map((action) => [
        action.label,
        isActionEnabled(action, editor),
      ]),
    ),
    [SPLIT_CELL_LABEL]: canSplitCell(editor),
  };
}

/** 여러 셀 선택을 되살리기 위해 기억해 두는 앵커/헤드 셀 위치 */
interface SavedCells {
  anchor: number;
  head: number;
}

/** 기억해 둔 위치로 CellSelection 을 다시 만든다. 문서가 바뀌었으면 null. */
function buildCellSelection(editor: Editor, saved: SavedCells | null) {
  if (!saved) return null;
  const { doc } = editor.state;
  if (saved.anchor > doc.content.size || saved.head > doc.content.size) {
    return null;
  }
  try {
    return CellSelection.create(doc, saved.anchor, saved.head);
  } catch {
    // 해당 위치가 더 이상 셀이 아니면 되살리지 않는다.
    return null;
  }
}

/** 되살린 셀 선택이 현재 선택과 다르면 적용한다. */
function applyCellSelection(editor: Editor, saved: SavedCells | null) {
  const selection = buildCellSelection(editor, saved);
  if (!selection) return false;
  if (!editor.state.selection.eq(selection)) {
    editor.view.dispatch(editor.state.tr.setSelection(selection));
  }
  return true;
}

/** 우클릭 지점이 기억해 둔 셀 선택 범위 안인지 */
function isInsideSavedCells(
  editor: Editor,
  saved: SavedCells | null,
  pos: number | undefined,
) {
  if (pos == null) return false;
  const selection = buildCellSelection(editor, saved);
  return (
    selection?.ranges.some(
      (range) => pos >= range.$from.pos && pos <= range.$to.pos,
    ) ?? false
  );
}

/**
 * 표 안에서 우클릭하면 셀·행·열을 바로 바꿀 수 있는 컨텍스트 메뉴를 띄운다.
 * 표 밖에서는 브라우저 기본 메뉴를 그대로 둔다.
 */
export function TableContextMenu({ editor }: { editor: Editor | null }) {
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [splitOpen, setSplitOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const savedCells = useRef<SavedCells | null>(null);

  const close = useCallback(() => setMenu(null), []);

  useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom as HTMLElement;

    /**
     * 우클릭 직전의 셀 선택을 기억해 둔다.
     *
     * 우클릭하면 브라우저가 네이티브 캐럿을 클릭 지점으로 옮기고, ProseMirror 의 DOM
     * 옵저버가 그 변화를 읽어 CellSelection 을 TextSelection 으로 덮어써 버린다.
     * 그래서 여러 셀을 선택해 둔 상태로 우클릭하면 선택이 풀린다. 선택 범위 안을
     * 우클릭한 경우엔 기본 동작을 막아 캐럿 이동 자체를 차단하고, 그래도 풀리는
     * 브라우저를 위해 기억해 둔 값으로 되살린다.
     */
    const handleMouseDownCapture = (event: MouseEvent) => {
      if (event.button !== 2) return;
      const { selection } = editor.state;
      savedCells.current =
        selection instanceof CellSelection
          ? { anchor: selection.$anchorCell.pos, head: selection.$headCell.pos }
          : null;

      const found = editor.view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      });
      if (isInsideSavedCells(editor, savedCells.current, found?.pos)) {
        event.preventDefault();
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      if (!editor.isEditable) return;
      const target = event.target as HTMLElement | null;
      // 표 밖에서는 기본 메뉴(맞춤법 검사·붙여넣기 등)를 막지 않는다.
      if (!target?.closest('table')) return;

      const found = editor.view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      });

      // 여러 셀을 선택해 둔 범위 안을 우클릭했다면 그 선택을 지키고(= 병합 등에 필요),
      // 아니면 우클릭한 셀로 커서를 옮겨 메뉴가 그 셀에 적용되게 한다.
      if (isInsideSavedCells(editor, savedCells.current, found?.pos)) {
        applyCellSelection(editor, savedCells.current);
        editor.view.focus();
      } else {
        savedCells.current = null;
        if (found) editor.chain().focus().setTextSelection(found.pos).run();
      }

      event.preventDefault();
      // 활성 여부는 선택을 정리한 뒤에 계산해야 '셀 병합' 이 잘못 비활성화되지 않는다.
      setMenu({
        x: event.clientX,
        y: event.clientY,
        enabled: snapshotEnabled(editor),
      });
    };

    dom.addEventListener('mousedown', handleMouseDownCapture, true);
    dom.addEventListener('contextmenu', handleContextMenu);
    return () => {
      dom.removeEventListener('mousedown', handleMouseDownCapture, true);
      dom.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [editor]);

  // 바깥 클릭 / Esc / 스크롤 / 리사이즈로 닫는다.
  useEffect(() => {
    if (!menu) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [menu, close]);

  // 뷰포트를 넘어가면 반대쪽으로 접어 넣는다.
  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!menu || !el) return;
    const rect = el.getBoundingClientRect();
    let { x, y } = menu;
    if (x + rect.width > window.innerWidth - VIEWPORT_MARGIN) {
      x = Math.max(
        VIEWPORT_MARGIN,
        window.innerWidth - rect.width - VIEWPORT_MARGIN,
      );
    }
    if (y + rect.height > window.innerHeight - VIEWPORT_MARGIN) {
      y = Math.max(
        VIEWPORT_MARGIN,
        window.innerHeight - rect.height - VIEWPORT_MARGIN,
      );
    }
    if (x !== menu.x || y !== menu.y) {
      setMenu((prev) => (prev ? { ...prev, x, y } : prev));
    }
  }, [menu]);

  if (!editor) return null;

  const runAction = (action: TableAction) => {
    // 메뉴가 떠 있는 사이 셀 선택이 풀렸을 수 있어 실행 직전에 되살린다.
    applyCellSelection(editor, savedCells.current);
    action.run(editor);
    close();
  };

  // 나눌 행/열 개수를 팝업으로 입력받는다. (병합 되돌리기는 별도 메뉴)
  const handleSplitCell = () => {
    close();
    setSplitOpen(true);
  };

  const handleSplitSubmit = ({ rows, cols }: SplitCounts) => {
    editor.chain().focus().splitCellIntoGrid({ rows, cols }).run();
    setSplitOpen(false);
  };

  return (
    <>
      {menu &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            role='menu'
            aria-label='표 편집'
            className='tiptap-table-context-menu'
            style={{ top: menu.y, left: menu.x }}
            onMouseDown={(event) => event.preventDefault()}
            onContextMenu={(event) => event.preventDefault()}
          >
            {CELL_ACTIONS.map((action) => (
              <button
                key={action.label}
                type='button'
                role='menuitem'
                className='tiptap-table-context-menu-item'
                onClick={() => runAction(action)}
                disabled={!menu.enabled[action.label]}
              >
                {action.label}
              </button>
            ))}
            <button
              type='button'
              role='menuitem'
              className='tiptap-table-context-menu-item'
              onClick={handleSplitCell}
              disabled={!menu.enabled[SPLIT_CELL_LABEL]}
            >
              {SPLIT_CELL_LABEL}
            </button>

            {MENU_ENTRIES.map((entry, index) =>
              entry.kind === 'separator' ? (
                <div
                  key={`separator-${index}`}
                  className='tiptap-table-context-menu-separator'
                />
              ) : (
                <button
                  key={entry.action.label}
                  type='button'
                  role='menuitem'
                  className='tiptap-table-context-menu-item'
                  data-danger={entry.danger ? 'true' : undefined}
                  onClick={() => runAction(entry.action)}
                  disabled={!menu.enabled[entry.action.label]}
                >
                  {entry.action.label}
                </button>
              ),
            )}
          </div>,
          document.body,
        )}

      {splitOpen && (
        <TableSplitDialog
          onClose={() => setSplitOpen(false)}
          onSubmit={handleSplitSubmit}
        />
      )}
    </>
  );
}

export default TableContextMenu;
