'use client';

import Link from 'next/link';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

const Footer = () => {
  const { startNavigation } = useNavigationLoading();

  return (
    <div className={'w-full my-5 py-3 px-5 flex items-center justify-between glass-card z-10'}>
      <span>© 2026 Juniverse Dev</span>
      <span>
        <Link href={'/posts'} prefetch={false} onClick={startNavigation} className={'hover:underline'}>
          Posts
        </Link>
      </span>
    </div>
  );
};

export default Footer;
