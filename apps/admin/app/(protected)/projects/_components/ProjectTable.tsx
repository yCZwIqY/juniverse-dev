'use client';

import { useRouter } from 'next/navigation';

import type { ProjectData } from 'apis';
import { Badge, Button } from 'components';

interface ProjectTableProps {
  data: ProjectData[];
  onDelete: (id: number) => Promise<unknown>;
}

const ProjectTable = ({ data, onDelete }: ProjectTableProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      {data.map((project) => (
        <div
          key={project.id}
          onClick={() => router.push(`/projects/${project.id}`)}
          className="glass-card p-4 cursor-pointer hover:bg-[var(--color-surface-soft)] transition-colors"
        >
          <div className="flex gap-4">
            <div className="w-[120px] shrink-0">
              {project.imageUrls?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.imageUrls[0]}
                  alt={`${project.title} thumbnail`}
                  className="h-20 w-full object-cover rounded-[var(--radius-sm)]"
                />
              ) : (
                <div className="h-20 w-full rounded-[var(--radius-sm)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] flex items-center justify-center text-xs text-[var(--muted-foreground)]">
                  No Image
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-[var(--muted-foreground)]">#{project.id}</span>
                <Badge variant="outline">{project.isToy ? 'Toy' : 'Project'}</Badge>
              </div>
              <div className="text-sm font-semibold text-[var(--color-ink)]">{project.title}</div>
              <div className="mt-1 text-xs text-[var(--muted-foreground)] line-clamp-2">{project.description ?? '-'}</div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              {project.gitHubUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.gitHubUrl} target="_blank" rel="noreferrer">GitHub</a>
                </Button>
              )}
              {project.demoUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">Demo</a>
                </Button>
              )}
              <Button variant="destructive" size="sm" onClick={() => onDelete(project.id)}>
                삭제
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTable;
