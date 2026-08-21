'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import { MenuData } from 'apis';
import MenuGroup from './MenuGroup';

interface MobileCategoryDrawerProps {
  menus: MenuData[];
}

export const MobileCategoryDrawer = ({ menus }: MobileCategoryDrawerProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <>
      {/* 트리거 버튼 — 모바일 전용 */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--color-hairline)] text-sm text-[var(--color-ink)] hover:border-[var(--color-primary)] transition-colors"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
          <rect y="1" width="13" height="1.2" rx=".6" fill="currentColor" />
          <rect y="5.9" width="9" height="1.2" rx=".6" fill="currentColor" />
          <rect y="10.8" width="5" height="1.2" rx=".6" fill="currentColor" />
        </svg>
        Categories
      </button>

      {/* 드로어 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setOpen(false)}
        >
          {/* 백드롭 */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* 패널 */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="카테고리"
            className="absolute bottom-0 left-0 right-0 bg-[var(--color-canvas-soft)] border-t border-[var(--color-hairline)] rounded-t-[var(--radius-lg)] max-h-[72vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 핸들 바 */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-[var(--color-hairline)]" />
            </div>

            {/* 헤더 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-hairline)] shrink-0">
              <span className="eyebrow">Categories</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-mute)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)] transition-colors text-base"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {/* 메뉴 목록 */}
            <div className="overflow-y-auto flex-1 px-4 py-3">
              <div className="flex flex-col gap-1" onClick={() => setOpen(false)}>
                {menus.map((menu) => (
                  <MenuGroup key={menu.id} menu={menu} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
