import { Metadata } from 'next';
import MyInfoSection from '@/app/(main)/about-me/_components/MyInfoSection';
import CareerSection from '@/app/(main)/about-me/_components/CareerSection';
import GithubSection from '@/app/(main)/about-me/_components/GithubSection';
import TechStackSection from '@/app/(main)/_components/TechStackSection';
import ContactSection from '@/app/(main)/_components/ContactSection';

export const metadata: Metadata = { title: 'About Me' };

export const revalidate = 3600;

const AboutMePage = () => {
  return (
    <div className="py-4 flex flex-col gap-[var(--spacing-section)] reveal">
      <MyInfoSection />
      <CareerSection />
      <TechStackSection />
      <GithubSection />
      <ContactSection />
    </div>
  );
};

export default AboutMePage;
