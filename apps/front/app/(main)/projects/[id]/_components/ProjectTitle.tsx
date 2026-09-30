import { ProjectData } from 'apis';

interface ProjectTitleProps {
  project: ProjectData;
}

const ProjectTitle = ({ project }: ProjectTitleProps) => {
  const tags = project.tags ?? [];

  return (
    <header className="flex flex-col gap-3 pb-5 border-b border-[var(--color-hairline)]">
      {/* Eyebrow + badge */}
      <div className="flex items-center gap-3">
        <span className="eyebrow">Project</span>
        <span
          className={`text-[0.65rem] font-bold tracking-widest uppercase px-2 py-0.5 rounded-[var(--radius-sm)] border ${
            project.isToy
              ? 'border-[var(--color-hairline)] text-[var(--color-mute)]'
              : 'border-[var(--color-primary)]/50 text-[var(--color-primary)] bg-[var(--color-primary)]/10'
          }`}
        >
          {project.isToy ? 'Mini' : 'Main'}
        </span>
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-ink)] break-keep leading-tight tracking-tight">
          {project.title}
        </h1>
        {project.description && (
          <p className="text-sm md:text-base text-[var(--muted-foreground)] break-keep leading-relaxed max-w-2xl">
            {project.description}
          </p>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="chip cursor-default select-none text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
};

export default ProjectTitle;
