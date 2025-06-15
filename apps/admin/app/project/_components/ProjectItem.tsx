'use client';
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import ProjectDialog from '@/app/project/_components/ProjectDialog';

interface ProjectItemProps {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

const ProjectItem = ({ id, title, startDate, endDate }: ProjectItemProps) => {
  return (
    <div className={'p-4 border rounded-lg'}>
      <div className={'text-lg font-bold'}>{title}</div>
      <div className={'text-sm text-gray-400'}>
        {format(startDate, 'yyyy-MM-dd')}~{format(endDate, 'yyyy-MM-dd')}
      </div>
      <div className={'mt-12 flex justify-end gap-1'}>
        <ProjectDialog id={id}>
          <div className={'h-full px-2 flex justify-center items-center outline rounded-md'}>수정</div>
        </ProjectDialog>
        <Button size={'sm'} variant={'destructive'}>
          삭제
        </Button>
      </div>
    </div>
  );
};

export default ProjectItem;
