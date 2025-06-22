'use client';
import React from 'react';
import ProjectItem from './ProjectItem';
import NewProject from '@/app/project/_components/NewProject';
import { useProjects } from 'apis';
import { Project } from 'shared-types';

const ProjectList = () => {
  const { data } = useProjects();
  const projects = data?.result;
  return (
    <div className={'w-full h-full p-12'}>
      <div className={'grid grid-cols-3 gap-3'}>
        <NewProject />
        {projects && projects?.map((project: Project) => <ProjectItem key={project.id} {...project} />)}
      </div>
    </div>
  );
};

export default ProjectList;
