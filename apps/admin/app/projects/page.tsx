import React from 'react';
import ProjectTable from '@/app/projects/_components/ProjectTable';
import Button from '@/app/_components/common/Button';
import Link from 'next/link';
import { deleteProject, getProjects } from 'apis';

export const dynamic = 'force-dynamic';

const ProjectPage = async () => {
  const response = await getProjects();
  const items = response?.items ?? [];
  const total = response?.total ?? items.length;

  return (
    <div className={'py-10 flex flex-col gap-10'}>
      <div className={'flex justify-between items-center'}>
        <div className={'font-bold text-xl text-white'}>{total} 개의 프로젝트</div>
        <Button className={'py-2 px-4 rounded-lg'}>
          <Link href={'/projects/0'}>작성하기</Link>
        </Button>
      </div>
      <ProjectTable data={items} onDelete={deleteProject} />
    </div>
  );
};

export default ProjectPage;
