'use client';

import HomeSection from '@/app/_components/main/HomeSection';
import AboutMeSection from '@/app/_components/main/aboutMe/AboutMeSection';
import SkillSection from '@/app/_components/main/skillSet/SkillSection';
import ProjectSection from '@/app/_components/main/project/ProjectSection';
import { RefObject, useRef } from 'react';
import Footer from '@/app/_components/common/Footer';

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className={'h-screen overflow-y-scroll overflow-x-hidden scroll-smooth'}>
      <HomeSection />
      <AboutMeSection scrollContainerRef={scrollRef as RefObject<HTMLElement>} />
      <SkillSection />
      <ProjectSection />
      <Footer />
    </div>
  );
}
