import React from 'react';
import './global.css';
import Header from '@/app/_components/header/Header';
import Footer from '@/app/_components/footer/Footer';
import TrafficTracker from '@/app/_components/TrafficTracker';
import { NavigationLoadingProvider } from '@/app/_components/navigation/NavigationLoadingProvider';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className="">
    <head>
      <link rel='icon'
            href='/images/logo.png'
            type='image/png'
            sizes='32x32' />
      <title>
        Juniverse Dev
      </title>
    </head>
      <body
        className={`font-Suit antialiased bg-background w-dvw min-h-dvh !h-fit lg:w-[1120px] m-auto relative overflow-x-hidden overflow-y-auto !p-5 flex flex-col`}
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
