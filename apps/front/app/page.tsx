import HomeSection from '@/app/_components/home/HomeSection';
import AboutMeSection from '@/app/_components/home/AboutMeSection';

export default function Home() {
  return (
    <div className={'overflow-y-scroll overflow-x-hidden scroll-smooth'}>
      <HomeSection />
      <AboutMeSection />
    </div>
  );
}
