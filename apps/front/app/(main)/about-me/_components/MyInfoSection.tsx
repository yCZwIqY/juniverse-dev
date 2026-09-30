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
          React · Vue · TypeScript로 복잡한 업무 흐름을 사용하기 쉬운 화면으로 만드는 개발자입니다.
          의약품 관리 솔루션과 공공기관 업무 시스템, AI 서비스의 프론트엔드를 개발해 왔습니다.
        </p>
        <p className="text-sm md:text-base text-[var(--color-body)] max-w-[640px] leading-relaxed">
          공통 UI와 API 구조를 설계하고, 실시간 응답과 복잡한 상태를 일관되게 다루는 데 관심이 있습니다.
          Java · Spring Boot 서버 개발부터 배포·운영까지 경험하며 서비스 전체의 흐름을 함께 고민합니다.
        </p>
      </div>

      {/* Quick stats */}
      <div className="flex flex-wrap gap-3 pt-1">
        {[
          { label: 'Experience', value: '5년차' },
          { label: 'Focus', value: 'Frontend' },
          { label: 'Experience Areas', value: 'B2B · AI 서비스' },
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
