'use client';

import { useEffect } from 'react';

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error('[front] page error', error);
  }, [error]);

  return (
    <div className="py-4 flex flex-col gap-4">
      <section
        role="alert"
        className="w-full border border-border p-5 bg-card rounded-xl flex flex-col gap-4 min-h-[300px] justify-center items-center text-center"
      >
        <p className="text-sm text-[var(--muted-foreground)]">문제가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
        <button
          type="button"
          onClick={reset}
          className="text-sm px-4 py-2 rounded-[var(--radius-sm)] border border-border hover:bg-[var(--color-surface-soft)]"
        >
          다시 시도
        </button>
      </section>
    </div>
  );
};

export default ErrorPage;
