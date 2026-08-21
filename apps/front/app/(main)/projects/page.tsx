import React from 'react';
import MainProjects from '@/app/(main)/projects/_components/main-projects/MainProjects';
import { getProjects } from 'apis';
import ToyProjects from '@/app/(main)/projects/_components/toy-projects/ToyProjects';

export const revalidate = 3600;

const ProjectPage = async () => {
  const projects = await getProjects();
  const mainProjects = projects?.items.filter((it) => !it.isToy) ?? [];
  const toyProjects = projects?.items.filter((it) => it.isToy) ?? [];

  return (
    <div className="py-4 flex flex-col gap-[var(--spacing-section)]">
      <div className="color-block-section reveal">
        <div className="eyebrow mb-2">Portfolio</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)]">Projects</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-2">
          직접 기획하고 개발한 프로젝트들입니다.
        </p>
      </div>
      <MainProjects projects={mainProjects} />
      {toyProjects.length > 0 && (
        <div className="color-block-section">
          <ToyProjects projects={toyProjects} />
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
