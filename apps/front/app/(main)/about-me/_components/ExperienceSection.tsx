const experiences = [
  {
    title: '확장 가능한 프론트엔드 구조',
    description: '여러 애플리케이션에서 반복되는 UI·API·타입을 공통 패키지로 분리했습니다. 모노레포와 Module Federation을 활용하고, Storybook과 접근성 기준으로 컴포넌트의 사용 방법을 정리했습니다.',
  },
  {
    title: 'AI 결과를 검토하고 관리하는 화면',
    description: 'AI가 분석한 문서의 청크를 검토·편집하는 화면과 응답 평가, 데이터셋 및 모델 관리 기능을 개발했습니다. SSE 응답을 누적 렌더링하고 진행·완료·오류 상태를 구분했습니다.',
  },
  {
    title: '중단에도 복구 가능한 사용자 흐름',
    description: '대용량 파일 전송에 진행률·취소·재시도·업로드 재개를 구현했습니다. 실시간 연결 복구와 동시 수정 충돌 안내를 통해 사용자가 다음 행동을 선택할 수 있도록 구성했습니다.',
  },
  {
    title: '개발 이후의 품질과 운영',
    description: '레거시 화면을 점진적으로 전환하고 테스트 기준을 문서화했습니다. 운영 로그 조회 도구를 개발하고, CI 검증부터 Docker·Kubernetes·GitOps 배포 구성까지 경험했습니다.',
  },
];

const ExperienceSection = () => (
  <section className="flex flex-col gap-5">
    <div>
      <div className="eyebrow mb-1">Experience</div>
      <h2 className="text-xl font-bold text-[var(--color-ink)]">이런 문제를 해결해 왔습니다</h2>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {experiences.map((experience) => (
        <article key={experience.title} className="rounded-[var(--radius-md)] border border-[var(--color-hairline)] p-5 flex flex-col gap-3">
          <h3 className="font-bold text-[var(--color-ink)]">{experience.title}</h3>
          <p className="text-sm text-[var(--color-body)] leading-relaxed">{experience.description}</p>
        </article>
      ))}
    </div>
  </section>
);

export default ExperienceSection;
