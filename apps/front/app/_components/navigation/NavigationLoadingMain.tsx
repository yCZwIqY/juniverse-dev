'use client';

import { type ReactNode } from 'react';
import { useNavigationLoading } from './NavigationLoadingProvider';

export const NavigationLoadingMain = ({ children }: { children: ReactNode }) => {
  const { isNavigating } = useNavigationLoading();

  return (
    <main id="main-content" className="min-w-0 overflow-x-clip relative">
      <div role="status" aria-live="polite" className="sr-only">
        {isNavigating ? '페이지 이동 중' : ''}
      </div>
      {children}
      {isNavigating && (
        <div
          className="absolute inset-0 z-10 pointer-events-none bg-[var(--color-canvas)]/40"
          aria-hidden
        >
          <div className="sticky top-[50vh] flex justify-center -translate-y-1/2">
            <svg
              className="animate-spin w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <circle
                cx="12" cy="12" r="10"
                stroke="var(--color-hairline)"
                strokeWidth="3"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="var(--color-primary)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
    </main>
  );
};
