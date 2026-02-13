import { ProjectData } from 'apis';
import { ReactNode } from 'react';

interface ProjectMetaDataProps {
  project: ProjectData;
}

interface MetaRowProps {
  label: string;
  value?: ReactNode;
}

const LinkText = ({ href, children }: { href?: string; children: ReactNode }) => {
  if (!href) {
    return <span className={'text-gray-400'}>-</span>;
  }

  return (
    <a href={href}
       target={'_blank'}
       rel={'noreferrer'}
       className={'text-accent hover:underline break-all'}>
      {children}
    </a>
  );
};

const MetaRow = ({ label, value }: MetaRowProps) => {
  return (
    <div className={'grid grid-cols-[90px_1fr] lg:grid-cols-[120px_1fr] gap-3 items-start'}>
      <span className={'text-sm text-gray-500'}>{label}</span>
      <div className={'text-sm lg:text-base break-keep'}>{value ?? <span className={'text-gray-400'}>-</span>}</div>
    </div>
  );
};

const formatPeriod = (startDate?: string, endDate?: string) => {
  const start = startDate?.trim();
  const end = endDate?.trim();

  if (start && end) return `${start} - ${end}`;
  if (start) return `${start} - 진행중`;
  if (end) return end;
  return '-';
};

const ProjectMetaData = ({ project }: ProjectMetaDataProps) => {
  const sourceCodeEntries = Object.entries(project.sourceCode ?? {}).filter(([, url]) => Boolean(url));

  return (
    <div className={'grid grid-cols-1 gap-3 rounded-lg border border-border bg-card p-4 lg:p-5'}>
      <MetaRow label={'포지션'}
               value={project.position} />
      <MetaRow label={'기여도'}
               value={project.contribution} />
      <MetaRow label={'기간'}
               value={formatPeriod(project.startDate, project.endDate)} />
      <MetaRow label={'데모'}
               value={<LinkText href={project.demoUrl}>{project.demoUrl || '링크 이동'}</LinkText>} />
      <MetaRow label={'GitHub'}
               value={<LinkText href={project.gitHubUrl}>{project.gitHubUrl || '링크 이동'}</LinkText>} />
    </div>
  );
};

export default ProjectMetaData;
