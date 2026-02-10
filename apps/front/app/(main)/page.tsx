import HeroCard from '@/app/(main)/_components/HeroCard';
import TechStackSection from '@/app/(main)/_components/TechStackSection';
import ContactSection from '@/app/(main)/_components/ContactSection';
import LatestPosts from '@/app/(main)/_components/LatestPosts';
import RecentTags from '@/app/(main)/_components/RecentTags';

const MainPage = async () => {
  return (
    <div className={'py-4 flex flex-col gap-6'}>
      <HeroCard />
      <TechStackSection />
      <div className={'flex flex-col lg:grid grid-cols-[2fr_1fr] gap-2 my-5'}>
        <div className={'text-2xl md:text-3xl font-bold col-span-2  py-2'}>Posts</div>
        <LatestPosts />
        <RecentTags />
      </div>
      <ContactSection />
    </div>
  );
};

export default MainPage;
