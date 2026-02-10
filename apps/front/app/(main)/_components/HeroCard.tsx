import Link from 'next/link';

const HeroCard = () => {
  return (
    <section className={'hero-full w-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center items-center gap-4 text-center reveal'}>
      <div className={'text-2xl md:text-4xl font-bold leading-tight'}>
        5년차 프론트엔드 개발자 이지윤입니다.
      </div>
      <div className={'text-base md:text-md text-muted-foreground max-w-[720px]'}>
        사용자 경험과 성능을 함께 고려합니다.
      </div>
      <div className={'flex gap-2 flex-wrap justify-center'}>
        <span className={'chip'}>Frontend</span>
        <span className={'chip'}>Next.js</span>
        <span className={'chip'}>UI/UX</span>
        <span className={'chip'}>Performance</span>
      </div>
      <div className={'hero-orbit'}>
        <div className={'orbit-dot'} />
        <div className={'orbit-dot'} />
        <div className={'orbit-dot'} />
      </div>
    </section>
  );
};

export default HeroCard;
