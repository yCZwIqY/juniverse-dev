const careers = [
  {
    period: '2025.07 – 현재',
    company: '세이코어',
    role: 'Frontend Engineer',
    tags: ['React', 'Next.js', 'TypeScript', 'Turborepo', 'SSE'],
    description:
      '공공기관 업무 시스템과 AI 서비스의 프론트엔드 아키텍처 및 공통 개발 환경을 설계하고 개발합니다.',
    highlights: [
      'pnpm · Turborepo 모노레포와 공통 UI · API · 타입 패키지 구성',
      '권한 기반 라우팅과 서버 상태 · 폼 · 클라이언트 상태 처리 공통화',
      'AI 응답 스트리밍, 문서 편집 및 장시간 작업의 실시간 상태 UI 구현',
      'Storybook 문서화, 웹접근성 개선 및 CI/CD · 컨테이너 배포 구성',
    ],
  },
  {
    period: '2021.12 – 2025.04',
    company: '씨알에스큐브',
    role: 'Web Developer',
    tags: ['Vue', 'React', 'TypeScript', 'Java', 'Spring', 'RabbitMQ'],
    description:
      '의약품 안전관리 및 임상시험 솔루션의 프론트엔드와 Java · Spring 서버 기능을 개발했습니다.',
    highlights: [
      '복잡한 데이터 입력 화면과 REST API 기반 업무 로직 · 외부 시스템 연동',
      '비동기 요청 상태 처리와 다중 사용자 동시 수정 충돌 감지 구현',
      '운영 로그 조회와 관리자 도구 개발로 문제 확인 흐름 개선',
      '레거시 화면의 Vue 3 전환, 공통 UI 정비 및 테스트 작성 기준 문서화',
    ],
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
                <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--color-body)] leading-relaxed">
                  {c.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
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
