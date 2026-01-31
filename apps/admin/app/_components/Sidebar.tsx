'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className={'h-dvh w-[220px] bg-primary-800 text-white p-2'}>
      <div className={'px-10 py-5 text-xl flex justify-center items-center'}>블로그 관리</div>
      <div className={'flex flex-col gap-1 font-bold text-lg'}>
        <Link
          href={'/'}
          data-active={String(pathname === '/')}
          className={'hover:bg-primary-700 px-5 py-2 rounded-sm data-[active=true]:bg-primary-600'}
        >
          대시보드
        </Link>
        <Link
          href={'/menus'}
          data-active={pathname.startsWith('/menus')}
          className={'hover:bg-primary-700 px-5 py-2 rounded-sm data-[active=true]:bg-primary-600'}
        >
          메뉴 관리
        </Link>
        <Link
          href={'/blogs'}
          data-active={pathname.startsWith('/blogs')}
          className={'hover:bg-primary-700 px-5 py-2 rounded-sm data-[active=true]:bg-primary-600'}
        >
          블로그 관리
        </Link>
        <Link
          href={'/projects'}
          data-active={pathname.startsWith('/projects')}
          className={'hover:bg-primary-700 px-5 py-2 rounded-sm data-[active=true]:bg-primary-600'}
        >
          프로젝트 관리
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
