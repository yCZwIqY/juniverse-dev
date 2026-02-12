import { ProjectData } from 'apis';
import ToyProjectItem from '@/app/(main)/projects/_components/toy-projects/ToyProjectItem';

interface ToyProjectsProps {
  projects: ProjectData[];
}

const ToyProjects = ({ projects }: ToyProjectsProps) => {
  return (
    <div className={'glass-card p-4 lg:p-8 flex flex-col gap-2 text-gray-500 mt-10'}>
      <h3 className={'text-base font-bold pb-2'}>MINI PROJECTS</h3>
      <div className={'grid grid-cols-1 lg:grid-cols-3 gap-3'}>
        {projects.map((project) => (
          <ToyProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ToyProjects;
