import { ProjectData } from 'apis';
import { ReactNode } from 'react';

interface ProjectMetaDataProps {
  project: ProjectData;
}

const Dash = () => <span className="text-[var(--color-mute)]">—</span>;

const LinkText = ({ href, label }: { href?: string; label?: string }) => {
  if (!href) return <Dash />;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-[var(--color-primary)] hover:underline break-all transition-opacity hover:opacity-80"
    >
      {label ?? href}
    </a>
  );
};

const MetaRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-start gap-3 px-3 py-2.5">
    <span className="font-mono text-[0.65rem] text-[var(--color-mute)] uppercase tracking-widest w-16 shrink-0 pt-0.5">
      {label}
    </span>
    <div className="text-sm text-[var(--color-ink)] break-keep leading-relaxed min-w-0">
      {children}
    </div>
  </div>
);

const formatPeriod = (start?: string, end?: string) => {
  const s = start?.trim();
  const e = end?.trim();
  if (s && e) return `${s} – ${e}`;
  if (s) return `${s} – 진행중`;
  if (e) return e;
  return null;
};

const ProjectMetaData = ({ project }: ProjectMetaDataProps) => {
  const period = formatPeriod(project.startDate, project.endDate);

  return (
    <section className="flex flex-col gap-2.5">
      <div className="eyebrow">Info</div>
      <div className="border border-[var(--color-hairline)] rounded-[var(--radius-lg)] bg-[var(--color-canvas-soft)] divide-y divide-[var(--color-hairline)] overflow-hidden">
        {project.position && (
          <MetaRow label="Position">{project.position}</MetaRow>
        )}
        {project.contribution && (
          <MetaRow label="역할">{project.contribution}</MetaRow>
        )}
        {period && (
          <MetaRow label="기간">{period}</MetaRow>
        )}
        <MetaRow label="Demo">
          <LinkText href={project.demoUrl} label={project.demoUrl ? '바로가기 ↗' : undefined} />
        </MetaRow>
        <MetaRow label="GitHub">
          <LinkText href={project.gitHubUrl} label={project.gitHubUrl ? '저장소 보기 ↗' : undefined} />
        </MetaRow>
      </div>
    </section>
  );
};

export default ProjectMetaData;
