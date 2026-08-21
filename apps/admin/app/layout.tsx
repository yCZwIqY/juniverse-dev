import './global.css';
import type { Metadata } from 'next';
import Provider from '@/app/(protected)/_provider/provider';

export const viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Juniverse Dev: 관리자 사이트',
  description: '관리자 외 접근 불가',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/apple-icon-180x180.png', sizes: '180x180' },
    ],
  },
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/ms-icon-144x144.png',
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
