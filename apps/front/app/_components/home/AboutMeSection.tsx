'use client';

import React from 'react';
import useScrollTriggerValue from '@/hooks/useScrollTriggerValue';
import Image from 'next/image';
import AboutMeLabelText from '@/app/_components/home/AboutMeLabelText';
import CareerBox from '@/app/_components/home/CareerBox';

const AboutMeSection = () => {
  const { value, targetRef } = useScrollTriggerValue(180);

  return (
    <div ref={targetRef} className={'w-dvw h-dvh flex justify-center items-center p-5 md:p-0'} id={'about-me'}>
      <div
        className={'relative w-[800px] h-[420px] mt-24 transition-all shadow-xl top-[18%]'}
        style={{ boxShadow: '3px 6px 8px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <div
          className={`absolute flex justify-center items-center bottom-0 w-full h-full bg-amber-50 rounded-md transition-all duration-700 delay-100 ease-in-out transform-3d z-10`}
          style={{
            transformOrigin: 'center top',
            transform: `rotateX(-${value}deg)`,
            zIndex: 10,
            boxShadow: '3px 6px 8px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div
            className={
              'h-full w-full origin-center rounded-b-md bg-blue-950 text-[#857F6F] flex justify-end items-end text-right py-8 px-12 font-bold'
            }
            style={{ boxShadow: '3px 6px 8px 0px rgba(0, 0, 0, 0.25)' }}
          >
            <div className={'rotate-90  flex flex-col items-end'}>
              <Image src={'/icon/trip.svg'} alt={'여권 로고'} width={120} height={120} />
              <div className={'text-2xl mt-4'}>대한민국 여권</div>
              <div className={'text-xl'}>
                REPUBLIC OF KOREA
                <br /> PASSPORT
              </div>
            </div>
          </div>
          <div
            className={'absolute inset-0 bg-white rounded-b-md  mx-[10px] mb-[10px]'}
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className={'rotate-180 flex flex-col justify-start h-full py-8 px-12'}>
              <div className={'font-bold text-xl mb-4'}>ABOUT ME</div>
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
          <div className={'absolute inset-0 bg-white rounded-b-md mx-[10px] mb-[10px] py-8 px-12'}>
            <div className={'font-bold text-xl'}>CAREER</div>
            <div>
              <CareerBox
                title={'CRSCube 주니어 웹 풀스택 개발자'}
                period={'2021.12 ~ 2025.04'}
                contents={['의약품 관리 솔루션 신규기능 개발 및 유지보수', '주요 기술: Typescript, Vue.js, Java, Spring Boot']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeSection;
