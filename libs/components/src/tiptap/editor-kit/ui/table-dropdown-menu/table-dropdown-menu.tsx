'use client';

import {
  type ForwardedRef,
  forwardRef,
  type MouseEvent,
  useState,
} from 'react';
import type { Editor } from '@tiptap/react'; // --- Hooks ---
import { useTiptapEditor } from '../../hooks/use-tiptap-editor'; // --- Icons ---
import { TableIcon } from '../../icons/table-icon';
import { ChevronDownIcon } from '../../icons/chevron-down-icon';
import { CloseIcon } from '../../icons/close-icon'; // --- UI Primitives ---
import type { ButtonProps } from '../../ui-primitive/button';
import { Button } from '../../ui-primitive/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../ui-primitive/dropdown-menu';
import { TextInput } from '../table-input';
import { BACKGROUND_COLORS } from './table-colors';
import {
  CELL_ACTIONS,
  COL_ACTIONS,
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

import './table-colors.scss';
import './table-dropdown-menu.scss';

/** grid picker 최대 크기 */
const MAX_ROWS = 8;
const MAX_COLS = 8;

type PaneKey = 'table' | 'cell' | 'row' | 'col' | 'props';

export interface TableDropdownMenuProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null;
  /** grid picker 최대 행 수 @default 8 */
  maxRows?: number;
  /** grid picker 최대 열 수 @default 8 */
  maxCols?: number;
  modal?: boolean;
  portal?: boolean;
}

/** 작은 오른쪽 화살표 — 서브메뉴가 있음을 표시 */
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z'
        fill='currentColor'
      />
    </svg>
  );
}

interface GridPickerProps {
  maxRows: number;
  maxCols: number;
  onPick: (rows: number, cols: number) => void;
}

/** hover 로 행×열을 선택하는 grid picker */
function GridPicker({ maxRows, maxCols, onPick }: GridPickerProps) {
  const [hover, setHover] = useState<{ row: number; col: number }>({
    row: 0,
    col: 0,
  });

  return (
    <div>
      <div
        className='tiptap-table-grid'
        style={{ gridTemplateColumns: `repeat(${maxCols}, 16px)` }}
        onMouseLeave={() => setHover({ row: 0, col: 0 })}
      >
        {Array.from({ length: maxRows * maxCols }).map((_, idx) => {
          const row = Math.floor(idx / maxCols) + 1;
          const col = (idx % maxCols) + 1;
          const selected = row <= hover.row && col <= hover.col;
          return (
            <button
              key={idx}
              type='button'
              className='tiptap-table-grid-cell'
              data-selected={selected}
              onMouseEnter={() => setHover({ row, col })}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onPick(row, col)}
              aria-label={`${col} × ${row}`}
            />
          );
        })}
      </div>
      <div className='tiptap-table-grid-label'>
        {hover.row > 0 ? `${hover.col} × ${hover.row}` : '표 크기 선택'}
      </div>
    </div>
  );
}

function ActionPanel({
  title,
  actions,
  editor,
  onDone,
}: {
  title: string;
  actions: TableAction[];
  editor: Editor;
  onDone: () => void;
}) {
  return (
    <div className='tiptap-table-panel-actions'>
      <div className='tiptap-table-panel-title'>{title}</div>
      {actions.map((action) => (
        <button
          key={action.label}
          type='button'
          className='tiptap-table-panel-button'
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            action.run(editor);
            onDone();
          }}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

/** 선택한 셀들의 배경색을 설정/해제한다. */
function setCellBackground(editor: Editor, value: string | null) {
  editor.chain().focus().setCellAttribute('backgroundColor', value).run();
}

/**
 * 셀 패널 — 병합/분할 액션과 셀 배경색 선택을 함께 제공한다.
 * 현재 커서가 놓인 셀(또는 다중 선택된 셀들)에 배경색이 적용된다.
 */
function CellPanel({
  editor,
  onDone,
  onRequestSplit,
}: {
  editor: Editor;
  onDone: () => void;
  /** '셀 분할' 을 눌렀을 때 개수 입력 팝업을 띄운다. */
  onRequestSplit: () => void;
}) {
  const activeColor = (editor.getAttributes('tableCell')?.backgroundColor ??
    editor.getAttributes('tableHeader')?.backgroundColor) as string | undefined;

  // 사용자 지정 색상 입력 상태 (#rrggbb) — 현재 셀 색으로 초기화
  const [customColor, setCustomColor] = useState<string>(() =>
    activeColor && /^#[0-9a-fA-F]{6}$/.test(activeColor)
      ? activeColor.toLowerCase()
      : '#ffffff',
  );

  // 커스텀 색상은 미세 조정을 위해 드롭다운을 닫지 않고 즉시 적용한다.
  const handleCustomApply = (value: string) => {
    setCustomColor(value);
    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      setCellBackground(editor, value);
    }
  };

  return (
    <div className='tiptap-table-panel-actions'>
      <div className='tiptap-table-panel-title'>셀</div>
      {CELL_ACTIONS.map((action) => (
        <button
          key={action.label}
          type='button'
          className='tiptap-table-panel-button'
          disabled={!isActionEnabled(action, editor)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            action.run(editor);
            onDone();
          }}
        >
          {action.label}
        </button>
      ))}
      <button
        type='button'
        className='tiptap-table-panel-button'
        disabled={!canSplitCell(editor)}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onRequestSplit}
      >
        {SPLIT_CELL_LABEL}
      </button>

      <div className='tiptap-table-menu-separator' />

      <div className='tiptap-table-panel-title'>셀 배경색</div>
      <div className='tiptap-color-grid'>
        {BACKGROUND_COLORS.map((color) => (
          <button
            key={color.value}
            type='button'
            className='tiptap-color-swatch'
            style={{ backgroundColor: color.value }}
            title={color.label}
            aria-label={color.label}
            data-active={activeColor === color.value}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setCellBackground(editor, color.value);
              onDone();
            }}
          />
        ))}
      </div>

      <div className='tiptap-color-custom'>
        <span className='tiptap-color-custom-label'>사용자 지정</span>
        <label
          className='tiptap-color-custom-swatch'
          style={{ backgroundColor: customColor }}
          title='색상 선택'
          onMouseDown={(e) => e.preventDefault()}
        >
          <input
            type='color'
            value={customColor}
            onChange={(e) => handleCustomApply(e.target.value)}
          />
        </label>
        <TextInput
          id='table-cell-custom-color'
          className='tiptap-table-cell-custom-input'
          value={customColor}
          setValue={(v) => {
            let next = v.trim();
            if (next && !next.startsWith('#')) next = `#${next}`;
            handleCustomApply(next);
          }}
          onEnterKeyPress={() => {
            if (/^#[0-9a-fA-F]{6}$/.test(customColor)) {
              setCellBackground(editor, customColor);
              onDone();
            }
          }}
          placeholder='#ffffff'
          height='32px'
          maxLength={7}
          spellCheck={false}
          aria-label='색상 코드'
          onMouseDown={(e) => e.stopPropagation()}
        />
      </div>

      <button
        type='button'
        className='tiptap-table-panel-button'
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          setCellBackground(editor, null);
          onDone();
        }}
      >
        배경색 지우기
      </button>
    </div>
  );
}

function TableDropdownMenuImpl(
  {
    editor: providedEditor,
    maxRows = MAX_ROWS,
    maxCols = MAX_COLS,
    modal = false,
    portal = true,
    ...props
  }: TableDropdownMenuProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = useState(false);
  const [pane, setPane] = useState<PaneKey>('table');
  const [isSplitDialogOpen, setIsSplitDialogOpen] = useState(false);

  if (!editor) return null;

  const inTable = editor.isActive('table');

  const close = () => {
    setIsOpen(false);
    setPane('table');
  };

  const handleInsert = (rows: number, cols: number) => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
    close();
  };

  const handleDelete = () => {
    editor.chain().focus().deleteTable().run();
    close();
  };

  // 나눌 행/열 개수를 팝업으로 입력받는다. (병합 되돌리기는 별도 메뉴)
  const handleRequestSplit = () => {
    close();
    setIsSplitDialogOpen(true);
  };

  const handleSplitSubmit = ({ rows, cols }: SplitCounts) => {
    editor.chain().focus().splitCellIntoGrid({ rows, cols }).run();
    setIsSplitDialogOpen(false);
  };

  // 좌측 메뉴 항목 정의
  const menuItems: {
    key: PaneKey;
    label: string;
    enabled: boolean;
  }[] = [
    { key: 'table', label: '표', enabled: true },
    { key: 'cell', label: '셀', enabled: inTable },
    { key: 'row', label: '행', enabled: inTable },
    { key: 'col', label: '열', enabled: inTable },
    { key: 'props', label: '표 속성', enabled: inTable },
  ];

  const renderPane = () => {
    switch (pane) {
      case 'cell':
        return (
          <CellPanel
            editor={editor}
            onDone={close}
            onRequestSplit={handleRequestSplit}
          />
        );
      case 'row':
        return (
          <ActionPanel
            title='행'
            actions={ROW_ACTIONS}
            editor={editor}
            onDone={close}
          />
        );
      case 'col':
        return (
          <ActionPanel
            title='열'
            actions={COL_ACTIONS}
            editor={editor}
            onDone={close}
          />
        );
      case 'props':
        return (
          <ActionPanel
            title='표 속성'
            actions={PROP_ACTIONS}
            editor={editor}
            onDone={close}
          />
        );
      case 'table':
      default:
        return (
          <GridPicker
            maxRows={maxRows}
            maxCols={maxCols}
            onPick={handleInsert}
          />
        );
    }
  };

  return (
    <>
      <DropdownMenu
        modal={modal}
        open={isOpen}
        onOpenChange={(next) => {
          setIsOpen(next);
          if (!next) setPane('table');
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button
            type='button'
            data-style='ghost'
            data-active-state={inTable ? 'on' : 'off'}
            role='button'
            title={'표 삽입'}
            tabIndex={-1}
            aria-label='표'
            tooltip='표'
            {...props}
            ref={ref}
          >
            <TableIcon className='tiptap-button-icon' />
            <ChevronDownIcon className='tiptap-button-dropdown-small' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='start' portal={portal}>
          <div className='tiptap-table-menu'>
            <div className='tiptap-table-menu-list'>
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  type='button'
                  className='tiptap-table-menu-item'
                  data-disabled={!item.enabled}
                  data-highlighted={pane === item.key && item.enabled}
                  onMouseEnter={() => item.enabled && setPane(item.key)}
                  onMouseDown={(e: MouseEvent) => e.preventDefault()}
                  onClick={() => item.enabled && setPane(item.key)}
                >
                  <TableIcon className='tiptap-table-menu-item-icon' />
                  <span className='tiptap-table-menu-item-label'>
                    {item.label}
                  </span>
                  <ChevronRight className='tiptap-table-menu-item-chevron' />
                </button>
              ))}

              <div className='tiptap-table-menu-separator' />

              <button
                type='button'
                className='tiptap-table-menu-item'
                data-danger='true'
                data-disabled={!inTable}
                onMouseEnter={() => inTable && setPane('table')}
                onMouseDown={(e: MouseEvent) => e.preventDefault()}
                onClick={() => inTable && handleDelete()}
              >
                <CloseIcon className='tiptap-table-menu-item-icon' />
                <span className='tiptap-table-menu-item-label'>표 삭제</span>
              </button>
            </div>

            <div className='tiptap-table-menu-panel'>{renderPane()}</div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {isSplitDialogOpen && (
        <TableSplitDialog
          onClose={() => setIsSplitDialogOpen(false)}
          onSubmit={handleSplitSubmit}
        />
      )}
    </>
  );
}

export const TableDropdownMenu = forwardRef(TableDropdownMenuImpl);

TableDropdownMenu.displayName = 'TableDropdownMenu';

export default TableDropdownMenu;
