'use client';

import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import ThemeSwitch from '@/app/_components/header/ThemeSwitch';
import Image from 'next/image';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { startNavigation, stopNavigation } = useNavigationLoading();
  const [searchText, setSearchText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    startNavigation();
    router.push(`/posts?search=${searchText}&page=1`);
    setSearchText('');
  };

  const onClickSearch = () => {
    if (searchText) {
      startNavigation();
      router.push(`/posts?search=${searchText}&page=1`);
      setSearchText('');
      return;
    }
    setShowInput(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  };

  const onBlur = () => {
    setShowInput(false);
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
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.includes('Mac');
      const isCmdK = isMac && e.metaKey && e.key.toLowerCase() === 'k';
      const isCtrlK = !isMac && e.ctrlKey && e.key.toLowerCase() === 'k';

      if (isCmdK || isCtrlK) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [inputRef]);

  return (
    <div className={'!sticky top-5 w-full mt-5 py-3 px-5 flex items-center justify-between glass-card z-10'}>
      <div className={'flex items-center gap-4'}>
        <Link href={'/'} prefetch={false} onClick={onClickTo('/')}>
          <Image src={'/images/logo.png'} className={'size-6 lg:size-8'} alt={'로고'} width={24} height={24} />
        </Link>
        <div className={`flex gap-4 ${showInput ? 'hidden lg:block' : 'block'}`}>
          <Link href={'/posts'} prefetch={false} onClick={onClickTo('/posts')} className={'font-semibold hover:underline'}>
            Posts
          </Link>
          <Link href={'/projects'} prefetch={false} onClick={onClickTo('/projects')} className={'font-semibold hover:underline'}>
            Projects
          </Link>
        </div>
      </div>
      <div className={'flex gap-4 items-center'}>
        <form onSubmit={onSearch}>
          <div className={`border rounded-full border-border py-2 px-3 ${showInput ? 'flex' : 'lg:flex'} gap-2 items-center`}>
            <button type={'button'} onClick={onClickSearch}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.55">
                  <path
                    d="M7 12C5.67392 12 4.40215 11.4732 3.46447 10.5355C2.52678 9.59785 2 8.32608 2 7C2 5.67392 2.52678 4.40215 3.46447 3.46447C4.40215 2.52678 5.67392 2 7 2C8.32608 2 9.59785 2.52678 10.5355 3.46447C11.4732 4.40215 12 5.67392 12 7C12 8.32608 11.4732 9.59785 10.5355 10.5355C9.59785 11.4732 8.32608 12 7 12Z"
                    stroke="var(--color-gray-400)"
                    strokeOpacity="0.72"
                    strokeWidth="1.33333"
                  />
                  <path d="M11 11L14 14" stroke="var(--color-gray-400)" strokeOpacity="0.72" strokeWidth="1.33333" strokeLinecap="round" />
                </g>
              </svg>
            </button>
            <input
              ref={inputRef}
              className={`placeholder:text-border outline-none border-none transition-all ${showInput ? 'w-[50dvw]' : '!w-0'} lg:!w-auto`}
              placeholder={'검색'}
              value={searchText}
              onBlur={onBlur}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </form>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Header;
