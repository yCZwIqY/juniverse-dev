'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NumberInput } from '../table-input';
import { MAX_SPLIT_COUNT } from '../../../nodes/table-split';

import './table-split-dialog.scss';

const ROWS_INPUT_ID = 'tiptap-table-split-rows';
const COLS_INPUT_ID = 'tiptap-table-split-cols';

export interface SplitCounts {
  rows: number;
  cols: number;
}

export interface TableSplitDialogProps {
  onClose: () => void;
  onSubmit: (counts: SplitCounts) => void;
}

/** 입력 문자열을 1 ~ MAX_SPLIT_COUNT 범위의 개수로 해석한다. */
function parseSplitCount(value: string) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return 1;
  return Math.min(MAX_SPLIT_COUNT, Math.max(1, parsed));
}

/**
 * '셀 분할' 대화상자 — 나눌 행/열 개수를 입력받는다.
 * 병합되지 않은 초기 상태의 셀에서도 동작한다.
 *
 * 열려 있을 때만 마운트한다(= 호출부에서 `{open && <TableSplitDialog .../>}`).
 * 그래야 열 때마다 입력값이 기본값으로 초기화된다.
 */
export function TableSplitDialog({ onClose, onSubmit }: TableSplitDialogProps) {
  const [rows, setRows] = useState('1');
  const [cols, setCols] = useState('2');

  // 첫 입력란에 포커스를 준다.
  useEffect(() => {
    const id = window.setTimeout(() => {
      const input = document.getElementById(
        ROWS_INPUT_ID,
      ) as HTMLInputElement | null;
      input?.focus();
      input?.select();
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  const rowCount = parseSplitCount(rows);
  const colCount = parseSplitCount(cols);
  const canSplit = rowCount * colCount > 1;

  const handleSubmit = () => {
    if (!canSplit) return;
    onSubmit({ rows: rowCount, cols: colCount });
  };

  return createPortal(
    <div className='tiptap-table-split-dialog-root'>
      <div
        className='tiptap-table-split-dialog-backdrop'
        onPointerDown={onClose}
      />
      <div
        role='dialog'
        aria-modal='true'
        aria-label='셀 분할'
        className='tiptap-table-split-dialog'
        // 에디터 툴바의 onMouseDown preventDefault 로 인풋 포커스가 막히지 않게 한다.
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className='tiptap-table-split-dialog-title'>셀 분할</div>

        <div className='tiptap-table-split-dialog-fields'>
          <div className='tiptap-table-split-dialog-field'>
            <label
              className='tiptap-table-split-dialog-label'
              htmlFor={ROWS_INPUT_ID}
            >
              행 개수
            </label>
            <NumberInput
              id={ROWS_INPUT_ID}
              className='tiptap-table-split-dialog-input'
              value={rows}
              setValue={setRows}
              useComma={false}
              maxLength={2}
              height='36px'
              onEnterKeyPress={handleSubmit}
            />
          </div>

          <div className='tiptap-table-split-dialog-field'>
            <label
              className='tiptap-table-split-dialog-label'
              htmlFor={COLS_INPUT_ID}
            >
              열 개수
            </label>
            <NumberInput
              id={COLS_INPUT_ID}
              className='tiptap-table-split-dialog-input'
              value={cols}
              setValue={setCols}
              useComma={false}
              maxLength={2}
              height='36px'
              onEnterKeyPress={handleSubmit}
            />
          </div>
        </div>

        <div className='tiptap-table-split-dialog-hint'>
          {`현재 셀을 ${rowCount}행 × ${colCount}열로 분할합니다. (각각 최대 ${MAX_SPLIT_COUNT})`}
        </div>

        <div className='tiptap-table-split-dialog-footer'>
          <button
            type='button'
            className='tiptap-table-split-dialog-button'
            onClick={onClose}
          >
            취소
          </button>
          <button
            type='button'
            className='tiptap-table-split-dialog-button'
            data-variant='primary'
            disabled={!canSplit}
            onClick={handleSubmit}
          >
            분할
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default TableSplitDialog;
