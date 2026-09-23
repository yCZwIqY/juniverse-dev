const qualifications = [
  { title: '소프트웨어공학 학사', description: '고려사이버대학교 · 2026.08 졸업' },
  { title: '정보처리기사', description: '한국산업인력공단 · 2026.06 취득' },
  { title: '프로그래밍기능사', description: '한국산업인력공단 · 2020.12 취득' },
];

const EducationSection = () => (
  <section className="flex flex-col gap-5">
    <div>
      <div className="eyebrow mb-1">Education & Certifications</div>
      <h2 className="text-xl font-bold text-[var(--color-ink)]">학력 · 자격</h2>
    </div>
    <ul className="divide-y divide-[var(--color-hairline)]">
      {qualifications.map((qualification) => (
        <li key={qualification.title} className="py-4 flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
          <span className="font-semibold text-[var(--color-ink)]">{qualification.title}</span>
          <span className="text-sm text-[var(--color-body)]">{qualification.description}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default EducationSection;
