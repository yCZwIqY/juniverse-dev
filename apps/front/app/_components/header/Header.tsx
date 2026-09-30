'use client';

import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.25" />
    <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { startNavigation, stopNavigation } = useNavigationLoading();
  const [searchText, setSearchText] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastScrollY = useRef(0);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    startNavigation();
    router.push(`/posts?search=${encodeURIComponent(searchText)}&page=1`);
    setSearchText('');
    inputRef.current?.blur();
  };

  const onClickSearchIcon = () => {
    if (searchText.trim()) {
      startNavigation();
      router.push(`/posts?search=${encodeURIComponent(searchText)}&page=1`);
      setSearchText('');
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  };

  const onClickTo =
    (targetPathname: string, targetQuery = '') =>
    (e: MouseEvent<HTMLAnchorElement>) => {
      const currentQuery = typeof window !== 'undefined' ? window.location.search.replace(/^\?/, '') : '';
      if (pathname === targetPathname && currentQuery === targetQuery) {
        e.preventDefault();
        stopNavigation();
        return;
      }
      startNavigation();
    };

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current <= 0) { setHidden(false); }
      else if (current > lastScrollY.current + 4) { setHidden(true); }
      else if (current < lastScrollY.current - 4) { setHidden(false); }
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.includes('Mac');
      const trigger = isMac ? e.metaKey && e.key.toLowerCase() === 'k' : e.ctrlKey && e.key.toLowerCase() === 'k';
      if (trigger) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navLinkClass = (targetPath: string) =>
    [
      'px-3 py-1.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]',
      pathname === targetPath
        ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)]'
        : 'text-[var(--color-body)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)]',
    ].join(' ');

  return (
    <header className={`sticky top-3 mt-3 z-10 flex-shrink-0 min-w-0 transition-transform duration-300 ${hidden ? '-translate-y-[120%]' : 'translate-y-0'}`}>
      <div className="flex items-center justify-between gap-3 px-4 py-1.5 bg-[var(--color-canvas-soft)] border border-[var(--color-hairline)] rounded-[var(--radius-lg)] overflow-hidden">
        {/* Logo + wordmark */}
        <Link href="/" prefetch={false} onClick={onClickTo('/')} className="flex items-center shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-150">
          <Image src="/images/header-1.png" alt="Juniverse Dev" width={2172} height={724} className="h-9 sm:h-14 w-auto" priority />
        </Link>

        {/* Nav */}
        <nav aria-label="주 내비게이션" className={`flex items-center gap-0.5 ${searchFocused ? 'hidden sm:flex' : 'flex'}`}>
          <Link href="/posts" prefetch={false} onClick={onClickTo('/posts')} className={navLinkClass('/posts')}>
            Posts
          </Link>
          <Link href="/projects" prefetch={false} onClick={onClickTo('/projects')} className={navLinkClass('/projects')}>
            Projects
          </Link>
        </nav>

        {/* Search */}
        <form onSubmit={onSearch} className="shrink-0">
          <div
            className={[
              'flex items-center gap-2 border rounded-[var(--radius-md)] px-2.5 py-1.5 overflow-hidden transition-all duration-200',
              searchFocused
                ? 'border-[var(--color-primary)] bg-[var(--color-canvas)] w-[40dvw] sm:w-52'
                : 'border-[var(--color-hairline)] bg-[var(--color-canvas)] w-9 sm:w-44',
            ].join(' ')}
          >
            <button
              type="button"
              onClick={onClickSearchIcon}
              className="text-[var(--color-mute)] hover:text-[var(--color-ink)] transition-colors duration-150 shrink-0"
              aria-label="검색"
            >
              <SearchIcon />
            </button>
            <input
              ref={inputRef}
              className="flex-1 min-w-0 bg-transparent text-sm text-[var(--color-ink)] placeholder:text-[var(--color-mute)] outline-none border-none"
              placeholder="검색... ⌘K"
              aria-label="포스트 검색"
              value={searchText}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
