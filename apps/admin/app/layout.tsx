import React from 'react';
import Sidebar from '@/app/_components/Sidebar';
import './global.css';
import '../styles/_variables.scss';
import '../styles/_keyframe-animations.scss';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className="dark">
      <body>
        <div className={'flex'}>
          <aside>
            <Sidebar />
          </aside>
          <main className={'flex-1 p-10 max-h-dvh overflow-y-auto'}>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
