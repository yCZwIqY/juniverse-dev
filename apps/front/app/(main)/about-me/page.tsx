import MyInfoSection from '@/app/(main)/about-me/_components/MyInfoSection';
import GithubSection from '@/app/(main)/about-me/_components/GithubSection';

const AboutMePage = () => {
  return (
    <section className={'glass-card w-full my-10 p-4 lg:p-8 flex flex-col gap-6 reveal'}>
      <MyInfoSection />
      <GithubSection />
    </section>
  );
};

export default AboutMePage;
