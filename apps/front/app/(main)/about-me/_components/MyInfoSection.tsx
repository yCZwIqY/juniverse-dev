const MyInfoSection = () => {
  return (
    <section className="flex flex-col gap-4 reveal">
      <div className="eyebrow">About Me</div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[var(--color-ink-strong)]">
          5년차 웹 개발자<br />
          이지윤입니다
        </h1>
        <p className="text-sm md:text-base text-[var(--color-body)] max-w-[560px] leading-relaxed">
          사용자 경험과 개발자 경험을 함께 고민하는 풀스택 지향 프론트엔드 개발자입니다.
          Next.js · NestJS 기반의 서비스를 설계하고 운영한 경험을 보유하고 있습니다.
        </p>
      </div>

      {/* Quick stats */}
      <div className="flex flex-wrap gap-3 pt-1">
        {[
          { label: 'Experience', value: '5년차' },
          { label: 'Focus', value: 'Frontend' },
          { label: 'Location', value: 'Seoul, KR' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-[var(--color-hairline)] rounded-[var(--radius-sm)] px-3 py-2 flex flex-col gap-0.5"
          >
            <span className="font-mono text-[0.6rem] text-[var(--color-mute)] uppercase tracking-widest">
              {stat.label}
            </span>
            <span className="text-sm font-semibold text-[var(--color-ink)]">{stat.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyInfoSection;
