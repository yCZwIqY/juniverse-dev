const stackGroups = [
  {
    category: 'Front',
    stacks: [
      { label: 'JavaScript', detail: 'ES6+ · Web App' },
      { label: 'Next.js', detail: 'App Router · SSR/ISR' },
      { label: 'React', detail: 'Component · State' },
      { label: 'React Native (Expo)', detail: 'Cross Platform App' },
      { label: 'TypeScript', detail: 'Type Safety' },
    ],
  },
  {
    category: 'Back',
    stacks: [
      { label: 'NestJS', detail: 'API · Auth' },
      { label: 'Java', detail: 'Backend' },
      { label: 'Spring', detail: 'Spring Boot' },
      { label: 'PostgreSQL', detail: 'Relational Data' },
      { label: 'MariaDB', detail: 'Relational Data' },
      { label: 'Oracle', detail: 'Enterprise DB' },
      { label: 'Redis', detail: 'Cache · Queue' },
    ],
  },
  {
    category: 'DevOps',
    stacks: [
      { label: 'Docker', detail: 'Containerize · Deploy' },
      { label: 'AWS Lightsail', detail: 'Instance · Deploy' },
    ],
  },
  {
    category: 'AI',
    stacks: [
      { label: 'Codex CLI', detail: 'Terminal Coding Agent' },
      { label: 'Cursor', detail: 'AI Code Editor' },
      { label: 'Claude MCP', detail: 'Tool Integration Protocol' },
      { label: 'AntiGravity', detail: 'AI Workflow Tooling' },
    ],
  },
];

const TechStackSection = () => {
  return (
    <section className={'glass-card w-full p-4 lg:p-8 flex flex-col gap-6 reveal'}>
      <div className={'flex flex-col gap-2'}>
        <div className={'text-xl font-bold'}>Tech Stack</div>
        {/*<div className={'text-sm text-muted-foreground'}>실무에서 바로 적용 가능한 기술 목록</div>*/}
      </div>
      <div className={'grid gap-4 md:grid-cols-2'}>
        {stackGroups.map((group) => (
          <div key={group.category} className={'rounded-xl border border-border p-4 flex flex-col gap-3 bg-background/40'}>
            <div className={'text-base font-bold'}>{group.category}</div>
            <div className={'stack-grid'}>
              {group.stacks.length > 0 ? group.stacks.map((s) => (
                <div key={s.label} className={'stack-card'}>
                  <div className={'stack-title'}>{s.label}</div>
                  <div className={'stack-detail'}>{s.detail}</div>
                </div>
              )) : (
                <div className={'stack-detail'}>추가 예정</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
