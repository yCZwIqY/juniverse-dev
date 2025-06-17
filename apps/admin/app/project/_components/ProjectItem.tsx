'use client';
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import ProjectDialog from '@/app/project/_components/ProjectDialog';
import { useRemoveProject } from 'apis';

interface ProjectItemProps {
  id: string;
  title: string;
  summary: string;
  startDate: Date;
  endDate: Date;
}

const ProjectItem = ({ id, title, summary, startDate, endDate }: ProjectItemProps) => {
  const { mutate: removeProject } = useRemoveProject();
  return (
    <div className={'p-4 border rounded-lg h-44'}>
      <div className={'text-lg font-bold'}>{title}</div>
      <div className={'text-sm text-gray-400'}>
        {format(startDate, 'yyyy-MM-dd')}~{format(endDate, 'yyyy-MM-dd')}
      </div>
      <div
        className={'mt-2'}
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {summary}
      </div>
      <div className={'mt-2 flex justify-end gap-1'}>
        <ProjectDialog id={id}>
          <div className={'h-full px-2 flex justify-center items-center outline rounded-md'}>수정</div>
        </ProjectDialog>
        <Button size={'sm'} variant={'destructive'} onClick={() => removeProject(id)}>
          삭제
        </Button>
      </div>
    </div>
  );
};

export default ProjectItem;
