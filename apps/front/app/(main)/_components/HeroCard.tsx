const HeroCard = () => {
  return (
    <section className={'hero-full w-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center items-center gap-4 text-center reveal'}>
      <div className={'text-2xl text-center md:text-4xl font-bold leading-tight'}>
        5년차 프론트엔드 개발자<br /> 이지윤의 블로그입니다
      </div>
      <div className={'text-base md:text-md text-muted-foreground max-w-[720px]'}>
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
