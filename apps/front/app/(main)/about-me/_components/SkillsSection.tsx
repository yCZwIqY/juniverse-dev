const groups = [
  { title: 'Frontend', skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML · CSS'] },
  { title: 'State & UI', skills: ['TanStack Query', 'React Hook Form', 'Jotai', 'Zustand', 'Tiptap', 'Storybook', 'Testing Library', 'WAI-ARIA'] },
  { title: 'Architecture & Backend', skills: ['pnpm · Turborepo', 'Module Federation', 'SSE', 'Java · Spring Boot', 'Spring AOP', 'MyBatis', 'REST API', 'RabbitMQ'] },
  { title: 'Database & Delivery', skills: ['MariaDB · MySQL', 'AWS S3', 'Nginx · PM2', 'GitLab CI/CD', 'Docker', 'Kubernetes', 'Kustomize · ArgoCD', 'Datadog RUM'] },
];

const SkillsSection = () => (
  <section className="color-block-section w-full flex flex-col gap-5">
    <div>
      <div className="eyebrow mb-1">Skills</div>
      <h2 className="text-xl font-bold text-[var(--color-ink)]">실무에서 사용한 기술</h2>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title} className="rounded-[var(--radius-md)] border border-[var(--color-hairline)] p-4 flex flex-col gap-3 bg-[var(--color-canvas)]">
          <h3 className="text-sm font-semibold text-[var(--color-ink)]">{group.title}</h3>
          <ul className="flex flex-wrap gap-2">
            {group.skills.map((skill) => <li key={skill} className="chip text-xs">{skill}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default SkillsSection;
