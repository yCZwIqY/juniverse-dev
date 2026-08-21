import './global.css';
import type { Metadata } from 'next';
import Provider from '@/app/(protected)/_provider/provider';

export const viewport = {
  themeColor: '#101010',
};

export const metadata: Metadata = {
  title: 'Juniverse Dev: 관리자 사이트',
  description: '관리자 외 접근 불가',
  icons: {
    icon: '/images/logo.png',
  },
};

const Layout = ({
                  children,
                }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ko'>
    <body className='h-fit min-h-dvh bg-[var(--color-canvas)] text-[var(--color-ink)]'>
    <Provider>
      {children}
    </Provider>
    </body>
    </html>
  );
};

export default Layout;
