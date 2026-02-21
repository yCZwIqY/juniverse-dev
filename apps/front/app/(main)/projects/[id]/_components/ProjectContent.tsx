import EditorViewer from '@/app/(main)/_components/EditorViewer';

interface ProjectContentProps {
  content: string;
}

interface GroupedSection {
  title: string;
  level: number;
  bodyHtml: string;
}

const stripHtml = (value: string) => {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const groupByHeading = (html: string): GroupedSection[] => {
  const headingRegex = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const matches = Array.from(html.matchAll(headingRegex));

  if (matches.length === 0) {
    return [
      {
        title: 'Details',
        level: 2,
        bodyHtml: html.trim() || '<p></p>',
      },
    ];
  }

  const sections: GroupedSection[] = [];
  const firstHeadingIndex = matches[0].index ?? 0;
  const introHtml = html.slice(0, firstHeadingIndex).trim();
  if (introHtml) {
    sections.push({
      title: '소개',
      level: 2,
      bodyHtml: introHtml,
    });
  }

  matches.forEach((match, idx) => {
    const headingStart = match.index ?? 0;
    const headingHtml = match[0] ?? '';
    const level = Number(match[1] ?? 2);
    const title = stripHtml(match[2] ?? '') || `Section ${idx + 1}`;
    const bodyStart = headingStart + headingHtml.length;
    const nextHeadingStart = matches[idx + 1]?.index ?? html.length;
    const bodyHtml = html.slice(bodyStart, nextHeadingStart).trim() || '<p></p>';

    sections.push({ title, level, bodyHtml });
  });

  return sections;
};

const ProjectContent = ({ content }: ProjectContentProps) => {
  const sections = groupByHeading(content);

  return (
    <section className={'flex flex-col gap-3'}>
      <div className={'flex flex-col gap-3'}>
        {sections.map((section, idx) => (
          <article key={`${section.title}-${idx}`}
                   className={'p-3 lg:p-4 flex flex-col gap-3'}>
            <div className={'px-2 pt-2'}>
              <h3 className={`font-bold break-keep ${section.level === 1 ? 'text-2xl' : section.level === 2 ? 'text-xl' : 'text-lg'}`}>
                {section.title}
              </h3>
            </div>
            <div className={'glass-card [&_div]:!p-4'}>
              <EditorViewer content={section.bodyHtml} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectContent;
