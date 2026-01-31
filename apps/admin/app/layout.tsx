import React from 'react';
import Sidebar from '@/app/_components/Sidebar';
import './global.css';

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
          <main className={'flex-1 p-10'}>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
