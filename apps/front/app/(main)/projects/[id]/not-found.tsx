import Link from 'next/link';

const PageNotFound = () => {
  return (
    <div className="py-12 flex flex-col items-center gap-6 text-center">
      <div className="eyebrow">404</div>
      <h1 className="text-2xl font-bold text-[var(--color-ink)]">프로젝트를 찾을 수 없습니다</h1>
      <p className="text-sm text-[var(--muted-foreground)]">
        삭제되었거나 잘못된 경로입니다.
      </p>
      <Link
        href="/projects"
        className="text-sm text-[var(--color-primary)] hover:opacity-80 transition-opacity"
      >
        ← 프로젝트 목록으로
      </Link>
    </div>
  );
};

export default PageNotFound;
