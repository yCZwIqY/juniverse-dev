import React from 'react';
import ProjectTable from '@/app/projects/_components/ProjectTable';
import Button from '@/app/_components/common/Button';
import Pagination from '@/app/_components/common/Pagination';
import Link from 'next/link';

const ProjectPage = () => {
  return (
    <div className={'py-10 flex flex-col gap-10'}>
      <div className={'flex justify-between items-center'}>
        <div className={'font-bold text-xl'}>N 개의 프로젝트</div>
        <Button className={'py-2 px-4 rounded-lg'}>
          <Link href={'/projects/0'}>작성하기</Link>
        </Button>
      </div>
      <ProjectTable data={[]}
                    page={1}
                    limit={10}
                    total={0} />
      <div className={'flex justify-center'}>
        <Pagination page={1}
                    total={0}
                    limit={10} />
      </div>
    </div>
  );
};

export default ProjectPage;