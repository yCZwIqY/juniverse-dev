'use client';
import { MenuData } from 'apis';
import { useState } from 'react';
import { useUpdateSearchParams } from '@/app/_hooks/useUpdateSearchParams';
import { useSearchParams } from 'next/navigation';

interface MenuItemProps {
  menu: MenuData;
}

const MenuGroup = ({ menu }: MenuItemProps) => {
  const [open, setOpen] = useState(false);

  const updateSearchParams = useUpdateSearchParams();
  const searchParams = useSearchParams();

  return (
    <div>
      <div className={`${open ? 'max-h-[1000px]' : 'max-h-[34px] overflow-hidden'} transition-all flex justify-between items-center min-w-[220px] border border-border px-3 py-1 rounded-sm`}>
        <button
          type="button"
          className={'flex-1 text-left'}
          onClick={() => {
            if (searchParams.get('category') === menu.id.toString()) return;
            updateSearchParams('category', menu.id.toString());
          }}
        >
          {menu.name}
        </button>
        {menu.children.length > 0 && (
          <button title={open ? '닫기' : '열기'}
                  className={`${open ? 'rotate-0' : 'rotate-180'} transition-all`}
                  type={'button'}
                  onClick={() => setOpen(!open)}>
            <svg width='12px'
                 height='12px'
                 viewBox='0 0 1024 1024'
                 version='1.1'
                 xmlns='http://www.w3.org/2000/svg'
                 fill='var(--color-foreground)'>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d='M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z'
                      fill='var(--color-foreground)'></path>
              </g>
            </svg>
          </button>
        )}
      </div>
      <div className={'pl-6 flex flex-col gap-0.5 mt-1'}>
        {open && menu.children.map((child) => (
          <MenuGroup key={`${menu.id}-${child.id}`} menu={child} />
        ))}
      </div>
    </div>
  );
};

export default MenuGroup;
