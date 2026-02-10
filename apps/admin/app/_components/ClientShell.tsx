'use client';

import { ReactNode, useState } from 'react';
import Sidebar from '@/app/_components/Sidebar';

const ClientShell = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col md:flex-row min-h-dvh h-full overflow-y-scroll'>
      <div className='md:hidden flex items-center justify-between px-4 py-3'>
        <div className='text-sm font-semibold text-gray-100'>Admin</div>
        <button
          type='button'
          onClick={() => setIsOpen((prev) => !prev)}
          className='px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-gray-100 hover:bg-white/20'
        >
          메뉴
        </button>
      </div>
      <div
        className={`fixed inset-0 z-40 md:hidden ${isOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-[280px] transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Sidebar />
        </div>
      </div>
      <aside className='hidden md:block md:sticky md:top-0 md:h-dvh'>
        <Sidebar />
      </aside>
      <main className='flex-1 p-4 md:p-10 md:max-h-dvh md:overflow-y-auto'>{children}</main>
    </div>
  );
};

export default ClientShell;
