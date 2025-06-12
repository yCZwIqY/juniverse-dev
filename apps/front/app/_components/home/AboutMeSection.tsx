'use client';

import React from 'react';
import useScrollTriggerValue from '@/hooks/useScrollTriggerValue';
import Image from 'next/image';
import AboutMeLabelText from '@/app/_components/home/AboutMeLabelText';

const AboutMeSection = () => {
  const { value, targetRef } = useScrollTriggerValue(180);

  return (
    <div className={'w-dvw h-dvh flex justify-center items-center'} id={'about-me'}>
      <div
        ref={targetRef}
        className={'relative w-[530px] h-[330px] mt-24 transition-all shadow-xl'}
        style={{ top: `${value / 2}px`, boxShadow: '3px 6px 8px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <div
          className={`absolute flex justify-center items-center bottom-0 w-full h-full bg-amber-50 rounded-md transition-all duration-700 ease-in-out transform-3d z-10`}
          style={{
            transformOrigin: 'center top',
            transform: `rotateX(-${value}deg)`,
            zIndex: 10,
            boxShadow: '3px 6px 8px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div
            className={
              'h-[530px] w-[330px] rotate-90 origin-center rounded-r-md bg-blue-950 text-[#857F6F] flex flex-col items-end text-right py-8 px-12 font-bold'
            }
            style={{ boxShadow: '3px 6px 8px 0px rgba(0, 0, 0, 0.25)' }}
          >
            <Image src={'/icon/trip.svg'} alt={'여권 로고'} width={120} height={120} />
            <div className={'text-2xl mt-4'}>대한민국 여권</div>
            <div className={'text-xl'}>
              REPUBLIC OF KOREA
              <br /> PASSPORT
            </div>
          </div>
          <div
            className={'absolute inset-0 bg-white rounded-b-md  mx-[10px] mb-[10px]'}
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className={'rotate-180 flex flex-col justify-start h-full p-8'}>
              <div className={'text-2xl mb-4'}>About Me</div>
              <div>
                <div>
                  <div className={'flex gap-3'}>
                    <Image src={'/img/temp.png'} alt={'프로필 사진'} width={120} height={180} />
                    <div>
                      <AboutMeLabelText label={'Name'} value={'이지윤'} />
                      <AboutMeLabelText label={'MBTI'} value={'INTP/INFP'} />
                      <AboutMeLabelText label={'Job'} value={'Web Developer'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`absolute flex justify-center items-center rounded-b-md bottom-0 w-full h-full bg-blue-950  shadow-xl `}>
          <div className={'absolute inset-0 bg-white rounded-b-md mx-[10px] mb-[10px]'}>내용</div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeSection;
