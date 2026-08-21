const highlights = [
  { title: '문제 정의 중심', detail: '요구사항을 구조화하고 팀이 같은 방향을 보게 만드는 데 집중합니다.' },
  { title: 'UI/UX 균형', detail: '디자인 감도와 개발 효율을 함께 고려해 제품 품질을 끌어올립니다.' },
  { title: '성능/안정성', detail: '지표 기반으로 병목을 찾고, 안정적인 배포 흐름을 선호합니다.' },
];

const focusAreas = [
  { title: '서비스 구축', items: ['대시보드/어드민', '콘텐츠 플랫폼', '디자인 시스템 정리'] },
  { title: '협업 방식', items: ['명확한 PR/리뷰', '문서화와 기록', '일관된 코딩 컨벤션'] },
  { title: '최근 관심사', items: ['Next.js App Router', 'DX 개선', 'AI 개발 도구 활용'] },
];

const MyInfoSection = () => {
  return (
    <section className="flex flex-col gap-[var(--spacing-section)] reveal">
      {/* Hero */}
      <div>
        <div className="eyebrow mb-3">About Me</div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[var(--color-ink)] mb-4">
          5년차 웹 개발자<br />
          이지윤입니다
        </h1>
        <p className="text-base text-[var(--muted-foreground)] max-w-[540px] leading-relaxed">
          사용자 경험과 개발자 경험을 함께 고민하는 풀스택 지향 프론트엔드 개발자입니다.
          Next.js · NestJS 기반의 서비스 구축 경험을 보유하고 있습니다.
        </p>
      </div>

      {/* Strengths */}
      <div className="color-block-section flex flex-col gap-5">
        <div className="eyebrow mb-1">Strengths</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="bg-[var(--color-canvas)] rounded-[var(--radius-md)] p-4 border border-[var(--color-hairline)]"
            >
              <div className="text-sm font-bold mb-1.5 text-[var(--color-ink)]">{h.title}</div>
              <div className="text-sm text-[var(--muted-foreground)] leading-relaxed">{h.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus areas */}
      <div className="color-block-section flex flex-col gap-5">
        <div className="eyebrow mb-1">Focus Areas</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {focusAreas.map((area) => (
            <div key={area.title} className="flex flex-col gap-3">
              <div className="text-sm font-bold text-[var(--color-ink)]">{area.title}</div>
              <ul className="flex flex-col gap-1.5">
                {area.items.map((item) => (
                  <li key={item} className="text-sm text-[var(--color-ink)] flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyInfoSection;
