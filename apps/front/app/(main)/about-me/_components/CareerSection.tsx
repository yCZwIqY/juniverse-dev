const careers = [
  {
    period: '2022.07 – 현재',
    company: 'Saycore',
    role: 'Frontend Engineer',
    tags: ['Next.js', 'React', 'TypeScript', 'NestJS'],
    description:
      '콘텐츠 플랫폼 및 어드민 시스템 설계·개발. Next.js App Router 기반 SSR/ISR 적용, 다크 디자인 시스템 구축 및 TipTap 기반 에디터 개발.',
  },
  {
    period: '2020.03 – 2022.06',
    company: '이전 회사',
    role: 'Frontend Developer',
    tags: ['React', 'TypeScript', 'Spring Boot'],
    description:
      '서비스 프론트엔드 개발 및 유지보수. 공통 컴포넌트 라이브러리 정비, 성능 최적화 및 배포 자동화 작업 담당.',
  },
];

const CareerSection = () => {
  return (
    <section className="flex flex-col gap-5">
      <div>
        <div className="eyebrow mb-1">Career</div>
        <h2 className="text-xl font-bold text-[var(--color-ink)]">경력</h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* vertical hairline */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[var(--color-hairline)]" />

        <div className="flex flex-col gap-8">
          {careers.map((c, idx) => (
            <div key={idx} className="relative pl-6">
              {/* dot */}
              <div className="absolute left-0 top-[5px] w-[11px] h-[11px] rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-canvas)]" />

              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.65rem] text-[var(--color-mute)] uppercase tracking-widest">
                  {c.period}
                </span>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-bold text-base text-[var(--color-ink)]">{c.company}</span>
                  <span className="text-[var(--color-hairline)]">·</span>
                  <span className="text-sm text-[var(--color-body)]">{c.role}</span>
                </div>
                <p className="text-sm text-[var(--color-body)] leading-relaxed">{c.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {c.tags.map((tag) => (
                    <span key={tag} className="chip text-xs cursor-default select-none">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
