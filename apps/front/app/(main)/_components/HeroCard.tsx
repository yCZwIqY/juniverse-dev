const HeroCard = () => {
  return (
    <section className="w-full min-h-[60svh] md:min-h-[72svh] flex flex-col justify-center items-center gap-5 text-center reveal">
      <div className="eyebrow">Frontend Developer · 5Y</div>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[var(--color-ink)]">
        웹을 만드는 개발자
        <br />
        이지윤의 기술 블로그
      </h1>
      <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-[520px] leading-relaxed">
        Next.js · NestJS · 성능과 DX를 함께 고민하는 웹 개발자입니다.
      </p>
      <div className="flex gap-2 flex-wrap justify-center mt-2">
        <span className="chip">Frontend</span>
        <span className="chip">Next.js</span>
        <span className="chip">UI/UX</span>
        <span className="chip">Performance</span>
      </div>
    </section>
  );
};

export default HeroCard;
