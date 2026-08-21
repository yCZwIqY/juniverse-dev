import Link from 'next/link';

import { getProjects } from 'apis';
import { deleteProject } from '@/app/(protected)/_libs/projects';
import { Button } from 'components';
import ProjectTable from '@/app/(protected)/projects/_components/ProjectTable';

export const dynamic = 'force-dynamic';

const ProjectPage = async () => {
  const response = await getProjects();
  const items = response?.items ?? [];
  const total = response?.total ?? items.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="eyebrow mb-1">Portfolio</div>
          <div className="text-2xl font-bold text-[var(--color-ink)]">프로젝트 관리</div>
          <div className="text-sm text-[var(--muted-foreground)]">{total}개의 프로젝트</div>
        </div>
        <Button asChild variant="default" size="md">
          <Link href="/projects/0">추가하기</Link>
        </Button>
      </div>
      <ProjectTable data={items} onDelete={deleteProject} />
    </div>
  );
};

export default ProjectPage;
