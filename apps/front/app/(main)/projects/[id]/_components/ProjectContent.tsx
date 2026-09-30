import EditorViewer from '@/app/(main)/_components/EditorViewer';

interface ProjectContentProps {
  content: string;
}

interface GroupedSection {
  title: string;
  level: number;
  bodyHtml: string;
}

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const groupByHeading = (html: string): GroupedSection[] => {
  const headingRegex = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const matches = Array.from(html.matchAll(headingRegex));

  if (matches.length === 0) {
    return [{ title: 'Details', level: 2, bodyHtml: html.trim() || '<p></p>' }];
  }

  const sections: GroupedSection[] = [];
  const introHtml = html.slice(0, matches[0].index ?? 0).trim();
  if (introHtml) {
    sections.push({ title: '소개', level: 2, bodyHtml: introHtml });
  }

  matches.forEach((match, idx) => {
    const headingStart = match.index ?? 0;
    const headingHtml = match[0] ?? '';
    const level = Number(match[1] ?? 2);
    const title = stripHtml(match[2] ?? '') || `Section ${idx + 1}`;
    const bodyStart = headingStart + headingHtml.length;
    const nextStart = matches[idx + 1]?.index ?? html.length;
    const bodyHtml = html.slice(bodyStart, nextStart).trim() || '<p></p>';
    sections.push({ title, level, bodyHtml });
  });

  return sections;
};

const headingSize = (level: number) => {
  if (level === 1) return 'text-xl font-bold';
  if (level === 2) return 'text-lg font-bold';
  return 'text-base font-semibold';
};

const ProjectContent = ({ content }: ProjectContentProps) => {
  const sections = groupByHeading(content);

  return (
    <section className="flex flex-col gap-2.5">
      <div className="eyebrow">Content</div>
      <div className="flex flex-col gap-3">
        {sections.map((section, idx) => (
          <article key={`${section.title}-${idx}`} className="flex flex-col gap-1.5">
            {/* Section heading with violet accent bar */}
            <div className="flex items-center gap-3 px-1">
              <div className="w-[3px] h-5 rounded-full bg-[var(--color-primary)] shrink-0" />
              <h3 className={`text-[var(--color-ink)] break-keep ${headingSize(section.level)}`}>
                {section.title}
              </h3>
            </div>
            {/* Content card */}
            <div className="rounded-[var(--radius-sm)] bg-[var(--color-canvas)] overflow-hidden">
              <EditorViewer content={section.bodyHtml} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectContent;
