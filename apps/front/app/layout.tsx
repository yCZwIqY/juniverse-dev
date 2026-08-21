import React from 'react';
import './global.css';
import Header from '@/app/_components/header/Header';
import Footer from '@/app/_components/footer/Footer';
import TrafficTracker from '@/app/_components/TrafficTracker';
import { NavigationLoadingProvider } from '@/app/_components/navigation/NavigationLoadingProvider';
import { NavigationLoadingMain } from '@/app/_components/navigation/NavigationLoadingMain';
import localFont from 'next/font/local';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Juniverse Dev',
    template: 'Juniverse Dev - %s',
  },
  description: '5년차 웹 개발자 이지윤의 기술 블로그입니다. 프로젝트 경험을 다룹니다.',
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
        className={`antialiased bg-background w-full min-h-svh lg:max-w-[1120px] mx-auto relative overflow-x-clip !p-5 flex flex-col h-fit min-w-0`}
      >
        <NavigationLoadingProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-canvas)] focus:text-[var(--color-ink)] focus:border focus:border-[var(--color-primary)] focus:rounded-[var(--radius-sm)] focus:text-sm focus:font-medium"
          >
            본문으로 바로가기
          </a>
          <TrafficTracker />
          <Header />
          <NavigationLoadingMain>{children}</NavigationLoadingMain>
          <Footer />
        </NavigationLoadingProvider>
      </body>
    </html>
  );
};

export default MainLayout;
