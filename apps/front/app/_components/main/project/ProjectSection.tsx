'use client';
import { useProjects } from 'apis';
import { Project } from 'shared-types';
import ProjectItem from '@/app/_components/main/project/ProjectItem';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const ProjectSection = () => {
  const { data } = useProjects();
  const projects = data?.result;

  return (
    <div id={'project'} className={'w-screen bg-primary-lighter p-3 flex flex-col'} style={{ scrollSnapAlign: 'start' }}>
      <div className={'font-bold text-6xl text-primary px-12 py-6'}>PROJECTS</div>
      <div
        className={'overflow-y-scroll scroll-smooth h-screen'}
        style={{
          scrollSnapType: 'y mandatory',
        }}
      >
        <div className="flex flex-col gap-3 lg:w-[70dvw] m-auto">
          {projects?.map((project: Project, index) => <ProjectItem key={project.id} index={index} project={project} />)}
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
