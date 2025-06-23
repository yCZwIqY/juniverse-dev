'use client';
import { useProjects } from 'apis';
import { Project } from 'shared-types';
import ProjectItem from '@/app/_components/main/project/ProjectItem';

const ProjectSection = () => {
  const { data } = useProjects();
  const projects = data?.result;

  return (
    <div
      id={'project'}
      className={'w-screen h-screen overflow-hidden bg-primary-lighter  flex flex-col relative'}
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className={'absolute font-bold text-6xl text-primary px-12 mb-6 z-0 left-0 top-0'}>PROJECTS</div>
      <div
        className={'overflow-x-auto lg:overflow-x-hidden overflow-y-hidden lg:overflow-y-auto scroll-smooth h-screen z-10 py-12'}
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        <div className="flex md:flex-col gap-3 w-max lg:w-[70dvw] m-auto">
          {projects?.map((project: Project, index) => (
            <div key={project.id} className={'snap-center shrink-0 w-screen lg:w-full h-full'}>
              <ProjectItem index={index} project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
