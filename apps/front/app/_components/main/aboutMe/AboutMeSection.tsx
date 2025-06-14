'use client';

import React from 'react';
import useScrollTriggerValue from '@/hooks/useScrollTriggerValue';
import Image from 'next/image';
import AboutMeLabelText from '@/app/_components/main/aboutMe/AboutMeLabelText';
import CareerBox from '@/app/_components/main/aboutMe/CareerBox';
import { useCareers } from 'apis';
import { Career } from 'shared-types';

const AboutMeSection = () => {
  const { value, targetRef } = useScrollTriggerValue(180);
  const { data } = useCareers();
  const careers = data?.result ?? [];

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
                      <AboutMeLabelText label={'Job'} value={'웹 프론트엔드 개발자'} />
                    </div>
                    <div>
                      3년차 웹 프론트엔드 개발자 이지윤입니다. 사용자 중심의 디자인과 사용자 경험을 중요하게 생각하며, 최신 기술을 통해
                      안정적이고 효율적인 서비스를 제공하고자 노력합니다. 견고한 기반 위에 차곡차곡 쌓아 올린 경험과 지식을 바탕으로
                      프로젝트를 진행하고 있습니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`absolute flex justify-center items-center rounded-b-md bottom-0 w-full h-full bg-blue-950  shadow-xl `}>
          <div className={'absolute inset-0 bg-white rounded-b-md mx-[10px] mb-[10px] flex flex-col'}>
            <div className={'font-bold text-xl mb-4 p-4 md:px-12 md:pt-8'}>CAREER</div>
            <div className={'flex-1 overflow-y-scroll p-2 md:px-12 md:py-4'}>
              <div className={'flex gap-2'}>
                {careers.map((career: Career) => (
                  <CareerBox
                    key={career.id}
                    name={career.name}
                    position={career.position}
                    period={`${career.startDate} ~ ${career.endDate ?? '재직중'}`}
                    contents={career.contents}
                    tags={career.techs}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeSection;
