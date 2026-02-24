'use client';

import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

const Modal = ({
  open,
  title = '확인',
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  children,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative w-[420px] max-w-[92vw] rounded-2xl border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 text-white">
        <div className="text-lg font-bold text-white">{title}</div>
        {description && <p className="mt-2 text-sm text-gray-200">{description}</p>}
        {children && <div className="mt-4">{children}</div>}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-red-400/70 text-red-200 hover:bg-red-500/20"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
