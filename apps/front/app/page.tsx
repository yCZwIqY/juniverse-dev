import HomeSection from '@/app/_components/main/HomeSection';
import AboutMeSection from '@/app/_components/main/aboutMe/AboutMeSection';

export default function Home() {
  return (
    <div className={'overflow-y-scroll overflow-x-hidden scroll-smooth'}>
      <HomeSection />
      <AboutMeSection />
    </div>
  );
}
