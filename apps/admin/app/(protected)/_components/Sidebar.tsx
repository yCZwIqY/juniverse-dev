'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className={'h-full md:h-dvh w-full md:w-[260px] p-3 md:p-4'}>
      <div
        className={
          'h-full rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] text-gray-100'
        }
      >
        <div className={'px-6 py-5 text-lg font-bold flex justify-center items-center tracking-tight'}>
          블로그 관리
        </div>
        <div className={'gap-2 px-3 pb-4 font-semibold text-sm md:text-base text-gray-100 flex flex-col'}>
          <Link
            href={'/apps/admin/public'}
            data-active={String(pathname === '/')}
            className={
              'hover:bg-white/10 px-4 py-2 rounded-lg data-[active=true]:bg-white/15 data-[active=true]:text-white data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] data-[active=true]:border data-[active=true]:border-white/20'
            }
          >
            대시보드
          </Link>
          <Link
            href={'/menus'}
            data-active={pathname.startsWith('/menus')}
            className={
              'hover:bg-white/10 px-4 py-2 rounded-lg data-[active=true]:bg-white/15 data-[active=true]:text-white data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] data-[active=true]:border data-[active=true]:border-white/20'
            }
          >
            메뉴 관리
          </Link>
          <Link
            href={'/posts'}
            data-active={pathname.startsWith('/posts')}
            className={
              'hover:bg-white/10 px-4 py-2 rounded-lg data-[active=true]:bg-white/15 data-[active=true]:text-white data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] data-[active=true]:border data-[active=true]:border-white/20'
            }
          >
            포스트 관리
          </Link>
          <Link
            href={'/comments'}
            data-active={pathname.startsWith('/comments')}
            className={
              'hover:bg-white/10 px-4 py-2 rounded-lg data-[active=true]:bg-white/15 data-[active=true]:text-white data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] data-[active=true]:border data-[active=true]:border-white/20'
            }
          >
            댓글 관리
          </Link>
          <Link
            href={'/projects'}
            data-active={pathname.startsWith('/projects')}
            className={
              'hover:bg-white/10 px-4 py-2 rounded-lg data-[active=true]:bg-white/15 data-[active=true]:text-white data-[active=true]:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] data-[active=true]:border data-[active=true]:border-white/20'
            }
          >
            프로젝트 관리
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
