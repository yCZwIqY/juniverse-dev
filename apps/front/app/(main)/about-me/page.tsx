import { Metadata } from 'next';
import MyInfoSection from '@/app/(main)/about-me/_components/MyInfoSection';
import CareerSection from '@/app/(main)/about-me/_components/CareerSection';
import GithubSection from '@/app/(main)/about-me/_components/GithubSection';
import ExperienceSection from '@/app/(main)/about-me/_components/ExperienceSection';
import SkillsSection from '@/app/(main)/about-me/_components/SkillsSection';
import EducationSection from '@/app/(main)/about-me/_components/EducationSection';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'React · Vue · TypeScript 기반 웹 개발자 이지윤의 소개와 경력. B2B 업무 시스템, AI 서비스 연동, 프론트엔드 아키텍처 및 배포·운영 경험을 소개합니다.',
};

export const revalidate = 3600;

const AboutMePage = () => {
  return (
    <div className="py-4 flex flex-col gap-[var(--spacing-section)] reveal">
      <MyInfoSection />
      <CareerSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <GithubSection />
      <a className="contact-pill text-sm self-start" href="https://github.com/yCZwIqY" target="_blank" rel="noreferrer">
        GitHub에서 개발 기록 보기 ↗
      </a>
    </div>
  );
};

export default AboutMePage;
