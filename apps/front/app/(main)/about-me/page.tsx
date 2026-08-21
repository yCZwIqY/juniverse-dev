import MyInfoSection from '@/app/(main)/about-me/_components/MyInfoSection';
import GithubSection from '@/app/(main)/about-me/_components/GithubSection';

export const revalidate = 3600;

const AboutMePage = () => {
  return (
    <div className="py-8 flex flex-col gap-[var(--spacing-section)]">
      <MyInfoSection />
      <GithubSection />
    </div>
  );
};

export default AboutMePage;
