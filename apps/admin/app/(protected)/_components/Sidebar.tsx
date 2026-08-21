'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: '대시보드', exact: true },
  { href: '/menus', label: '메뉴 관리', exact: false },
  { href: '/posts', label: '포스트 관리', exact: false },
  { href: '/comments', label: '댓글 관리', exact: false },
  { href: '/projects', label: '프로젝트 관리', exact: false },
];

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  return (
    <div className="h-full md:h-dvh w-full md:w-[220px] flex flex-col border-r border-[var(--color-hairline)] bg-[var(--color-canvas)]">
      <div className="px-4 py-4 border-b border-[var(--color-hairline)] flex items-center gap-2.5">
        <img src="/header-1.png" alt="Juniverse Dev" width={28} height={28} className="shrink-0" />
        <span className="text-sm font-bold tracking-tight text-[var(--color-ink)]">블로그 관리</span>
      </div>
      <nav className="flex-1 flex flex-col gap-0.5 px-3 py-3">
        {NAV_ITEMS.map(({ href, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={[
              'px-3 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors',
              isActive(href, exact)
                ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)]'
                : 'text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)]',
            ].join(' ')}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
