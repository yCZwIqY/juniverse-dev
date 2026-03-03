'use client';

import { PostResponse } from 'apis';
import Link from 'next/link';

interface PostNavigatorProps {
  next?: PostResponse['data']['next'];
  prev?: PostResponse['data']['prev'];
}

const PostNavigator = ({ next, prev }: PostNavigatorProps) => {
  return (
    <div className={'hidden md:flex gap-2'}>
      {prev
        ? <div className={'glass-card [&::after]:right-0 [&::after]:left-[-20%] p-8 mt-4 flex-1'}>
          <div className={'flex gap-2 items-center text-gray-400 pb-2'}>
            <svg width='12px'
                 height='12px'
                 className={'rotate-90'}
                 viewBox='0 0 1024 1024'
                 version='1.1'
                 xmlns='http://www.w3.org/2000/svg'
                 fill='var(--color-gray-400)'>
              <g id='SVGRepo_bgCarrier'
                 strokeWidth='0'></g>
              <g id='SVGRepo_tracerCarrier'
                 strokeLinecap='round'
                 strokeLinejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <path d='M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z'
                      fill='var(--color-gray-400)'></path>
              </g>
            </svg>
            <span className={'text-sm'}>이전글</span>
          </div>
          <Link href={`/posts/${prev.id}`}
                className={'flex flex-col gap-1'}>
            <div className={'text-lg font-bold font-bold hover:underline'}>{prev.title}</div>
            <div className={'text-gray-500'}>{prev.subtitle}</div>
          </Link>
        </div>
        : <div className={'flex-1'}/>
      }
      {next
        ? <div className={'glass-card p-8 mt-4 flex-1'}>
          <div className={'flex gap-2 justify-end items-center text-gray-400 pb-2'}>
            <span className={'text-sm'}>다음글</span>
            <svg width='12px'
                 height='12px'
                 className={'-rotate-90'}
                 viewBox='0 0 1024 1024'
                 version='1.1'
                 xmlns='http://www.w3.org/2000/svg'
                 fill='var(--color-gray-400)'>
              <g id='SVGRepo_bgCarrier'
                 strokeWidth='0'></g>
              <g id='SVGRepo_tracerCarrier'
                 strokeLinecap='round'
                 strokeLinejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <path d='M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z'
                      fill='var(--color-gray-400)'></path>
              </g>
            </svg>
          </div>
          <Link href={`/posts/${next.id}`}
                className={'flex flex-col gap-1 text-right'}>
            <div className={'text-lg font-bold font-bold hover:underline'}>{next.title}</div>
            <div className={'text-gray-500'}>{next.subtitle}</div>
          </Link></div>
        : <div className={'flex-1'}/>}
    </div>)
    ;
};

export default PostNavigator;