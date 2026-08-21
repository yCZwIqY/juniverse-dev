'use client';

import { ReactNode, useEffect, useState } from 'react';

import Sidebar from '@/app/(protected)/_components/Sidebar';
import { useSse } from '@/hooks/use-sse';

type CommentAlarmPayload = {
  postTitle: string;
  comment: string;
  createdAt: string;
};

const ClientShell = ({ children }: { children: ReactNode }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { connect } = useSse<CommentAlarmPayload>({
    path: '/api/notifications/stream',
    events: ['comment.alarm'],
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (Notification.permission === 'default') {
      void Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    connect((data) => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;
      const notification = new Notification(`${data.postTitle} 새 댓글 알림`, {
        body: `${data.comment} (${new Date(data.createdAt).toLocaleDateString('ko-kr', { hour: '2-digit', minute: '2-digit' })})`,
      });
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    });
  }, [connect]);

  return (
    <div className="flex min-h-dvh bg-[var(--color-canvas)]">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-12 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]">
        <span className="text-sm font-bold text-[var(--color-ink)]">블로그 관리</span>
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="text-sm px-3 py-1 rounded-[var(--radius-sm)] border border-[var(--color-hairline)] hover:bg-[var(--color-surface-soft)]"
        >
          메뉴
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40" aria-modal>
          <div className="absolute inset-0 bg-[var(--color-overlay-scrim)]" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[220px]">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:block sticky top-0 h-dvh shrink-0">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 mt-12 md:mt-0 md:max-h-dvh md:overflow-y-auto p-6 md:p-10">
        {children}
      </main>
    </div>
  );
};

export default ClientShell;
