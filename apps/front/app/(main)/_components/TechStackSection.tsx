const stacks = [
  { label: 'Next.js', detail: 'App Router · SSR/ISR' },
  { label: 'React', detail: 'Component · State' },
  { label: 'TypeScript', detail: 'Type Safety' },
  { label: 'NestJS', detail: 'API · Auth' },
  { label: 'Java', detail: 'Backend' },
  { label: 'Spring', detail: 'Spring Boot' },
  { label: 'PostgreSQL', detail: 'Relational Data' },
  { label: 'MariaDB', detail: 'Relational Data' },
  { label: 'Oracle', detail: 'Enterprise DB' },
  { label: 'Redis', detail: 'Cache · Queue' },
  { label: 'AWS S3', detail: 'Assets' },
  { label: 'Docker', detail: 'Deploy' },
];

const TechStackSection = () => {
  return (
    <section className={'glass-card w-full p-8 md:p-10 flex flex-col gap-6 reveal'}>
      <div className={'flex flex-col gap-2'}>
        <div className={'text-xl font-bold'}>Tech Stack</div>
        <div className={'text-sm text-muted-foreground'}>실무에서 바로 적용 가능한 기술 목록</div>
      </div>
      <div className={'stack-grid'}>
        {stacks.map((s) => (
          <div key={s.label} className={'stack-card'}>
            <div className={'stack-title'}>{s.label}</div>
            <div className={'stack-detail'}>{s.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
