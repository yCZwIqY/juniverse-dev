const stackGroups = [
  {
    category: 'Frontend',
    stacks: [
      { label: 'Next.js', detail: 'App Router · SSR/ISR' },
      { label: 'React', detail: 'Component · State' },
      { label: 'TypeScript', detail: 'Type Safety' },
      { label: 'React Native', detail: 'Cross Platform App' },
    ],
  },
  {
    category: 'Backend',
    stacks: [
      { label: 'NestJS', detail: 'API · Auth' },
      { label: 'Spring Boot', detail: 'Java Enterprise' },
      { label: 'PostgreSQL', detail: 'Relational Data' },
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
    category: 'AI Tools',
    stacks: [
      { label: 'Claude MCP', detail: 'Tool Integration' },
      { label: 'Cursor', detail: 'AI Code Editor' },
      { label: 'Codex CLI', detail: 'Terminal Agent' },
    ],
  },
];

const TechStackSection = () => {
  return (
    <section className="color-block-section w-full flex flex-col gap-5 reveal">
      <div>
        <div className="eyebrow mb-1">Systems</div>
        <div className="text-xl font-bold text-[var(--color-ink)]">Tech Stack</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {stackGroups.map((group) => (
          <div
            key={group.category}
            className="rounded-[var(--radius-md)] border border-[var(--color-hairline)] p-4 flex flex-col gap-3 bg-[var(--color-canvas)]"
          >
            <div className="eyebrow">{group.category}</div>
            <div className="grid grid-cols-2 gap-2">
              {group.stacks.map((s) => (
                <div key={s.label} className="stack-card">
                  <div className="stack-title text-sm">{s.label}</div>
                  <div className="stack-detail">{s.detail}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
