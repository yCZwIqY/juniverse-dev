'use client';

import { MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

const Footer = () => {
  const pathname = usePathname();
  const { startNavigation, stopNavigation } = useNavigationLoading();

  const moveTo = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    const currentQuery = typeof window !== 'undefined' ? window.location.search.replace(/^\?/, '') : '';
    if (pathname === path && currentQuery === '') {
      e.preventDefault();
      stopNavigation();
      return;
    }
    startNavigation();
  };

  return (
    <footer className="w-full mt-8 pt-6 pb-4 border-t border-[var(--color-hairline)] flex items-center justify-between flex-shrink-0">
      <span className="eyebrow text-[var(--muted-foreground)]">© 2026 Juniverse Dev</span>
      <div className="flex gap-5">
        <Link
          href="/posts"
          prefetch={false}
          onClick={(e) => moveTo(e, '/posts')}
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--color-ink)] transition-colors"
        >
          Posts
        </Link>
        <Link
          href="/projects"
          prefetch={false}
          onClick={(e) => moveTo(e, '/projects')}
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--color-ink)] transition-colors"
        >
          Projects
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
