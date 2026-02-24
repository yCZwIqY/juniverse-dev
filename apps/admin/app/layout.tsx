import './global.css';
import type { Metadata } from 'next';
import Provider from '@/app/(protected)/_provider/provider';

export const viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Juniverse Dev 관리자 사이트',
  description: '...',
};

const Layout = ({
                  children,
                }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ko'>
    <body className='h-fit min-h-dvh bg-[radial-gradient(900px_circle_at_20%_10%,rgba(20,120,160,0.25),rgba(10,10,30,0.1)),radial-gradient(1200px_circle_at_80%_90%,rgba(40,60,140,0.25),rgba(10,10,30,0.1)),linear-gradient(135deg,#0b0f1f_0%,#101727_45%,#0b0f1f_100%)] text-gray-100'>
    <Provider>
      {children}
    </Provider>
    </body>
    </html>
  );
};

export default Layout;
