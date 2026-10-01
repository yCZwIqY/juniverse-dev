'use client';

import { useEffect } from 'react';

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error('[admin] page error', error);
  }, [error]);

  return (
    <div className="py-4 flex flex-col gap-4">
      <section
        role="alert"
        className="w-full min-h-[300px] flex flex-col gap-4 justify-center items-center text-center"
      >
        <p className="text-sm text-[var(--color-ink)]">문제가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
        <button
          type="button"
          onClick={reset}
          className="text-sm px-4 py-2 rounded-[var(--radius-sm)] border border-[var(--color-hairline)] hover:bg-[var(--color-surface-soft)]"
        >
          다시 시도
        </button>
      </section>
    </div>
  );
};

export default ErrorPage;
