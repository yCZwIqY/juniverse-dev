'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import React from 'react';
import DesktopTicket from '@/app/_components/main/DesktopTicket';
import MobileTicket from '@/app/_components/main/MobileTicket';

const HomeSection = () => {
  const { isDesktop } = useMediaQuery();

  return (
    <div
      className={'w-screen h-screen relative bg-gradient-to-b from-primary-lighter to-primary-white flex justify-center md:justify-start'}
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className={' text-primary text-3xl md:text-7xl font-bold pt-12 md:mx-36'}>
        JUNIVERSE DEV:
        <br />
        PROTFOLIO & BLOG
      </div>
      <div className={'absolute w-full h-full flex justify-center items-center'}>{isDesktop ? <DesktopTicket /> : <MobileTicket />}</div>
    </div>
  );
};

export default HomeSection;
