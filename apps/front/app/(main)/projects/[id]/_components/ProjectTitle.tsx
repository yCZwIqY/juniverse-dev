import { ProjectData } from 'apis';
import Tag from '@/app/_components/tag/Tag';

interface ProjectTitleProps {
  project: ProjectData;
}

const ProjectTitle = ({ project }: ProjectTitleProps) => {
  const tags = project.tags ?? [];

  return (
    <div className={'flex flex-col gap-4 border-b border-border pb-8'}>
      <div className={'flex items-center gap-2'}>
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${
            project.isToy
              ? 'bg-card text-gray-600 border-border'
              : 'bg-accent/10 text-accent border-accent/30'
          }`}
        >
          {project.isToy ? 'TOY PROJECT' : 'MAIN PROJECT'}
        </span>
      </div>

      <div className={'flex flex-col gap-2'}>
        <h1 className={'text-3xl lg:text-4xl font-bold break-keep'}>{project.title}</h1>
        <p className={'text-gray-500 text-base lg:text-lg break-keep whitespace-pre-line'}>{project.description}</p>
      </div>

      {tags.length > 0 && (
        <div className={'flex flex-wrap gap-2 [&_div]:!text-xs [&_div]:cursor-default'}>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectTitle;
