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
    <div className={'w-full my-5 py-3 px-5 flex items-center justify-between glass-card z-10'}>
      <span>© 2026 Juniverse Dev</span>
      <span>
        <Link href={'/posts'} prefetch={false} onClick={(e) => moveTo(e, '/posts')} className={'hover:underline'}>
          Posts
        </Link>
        <Link href={'/projects'} prefetch={false} onClick={(e) => moveTo(e, '/projects')} className={'hover:underline'}>
          Projects
        </Link>
      </span>
    </div>
  );
};

export default Footer;
