import { ProjectData } from 'apis';
import ToyProjectItem from '@/app/(main)/projects/_components/toy-projects/ToyProjectItem';

interface ToyProjectsProps {
  projects: ProjectData[];
}

const ToyProjects = ({ projects }: ToyProjectsProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="eyebrow mb-1">Mini</div>
        <h2 className="text-xl font-bold text-[var(--color-ink)]">토이 프로젝트</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {projects.map((project) => (
          <ToyProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ToyProjects;
