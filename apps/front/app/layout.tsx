import React from 'react';
import './global.css';
import Header from '@/app/_components/header/Header';
import Footer from '@/app/_components/footer/Footer';
import TrafficTracker from '@/app/_components/TrafficTracker';
import { NavigationLoadingProvider } from '@/app/_components/navigation/NavigationLoadingProvider';
import localFont from 'next/font/local';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Juniverse Dev',
  icons: {
    icon: '/images/logo.png',
  },
};

export const suit = localFont({
  src: [
    {
      path: '../fonts/SUIT-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/SUIT-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif'],
});

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ko' className={suit.className}>
      <body
        className={`antialiased bg-background w-full min-h-svh lg:max-w-[1120px] mx-auto relative overflow-x-hidden !p-5 flex flex-col`}
      >
        <NavigationLoadingProvider>
          <TrafficTracker />
          <Header />
          <main>{children}</main>
          <Footer />
        </NavigationLoadingProvider>
      </body>
    </html>
  );
};

export default MainLayout;
