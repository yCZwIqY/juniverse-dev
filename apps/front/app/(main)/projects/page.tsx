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
    <div className={'py-4 flex flex-col gap-4 relative'}>
      <div className={'w-full h-full flex flex-col gap-2 justify-between items-center'}>
        <h3 className={'text-2xl font-bold mb-4 w-full text-left py-4 flex'}>PROJECTS</h3>
        <MainProjects projects={mainProjects} />
        <ToyProjects projects={toyProjects} />
      </div>
    </div>
  );
};

export default ProjectPage;
