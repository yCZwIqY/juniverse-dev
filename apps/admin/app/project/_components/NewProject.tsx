'use client';
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import ProjectDialog from '@/app/project/_components/ProjectDialog';

const NewProject = () => {
  return (
    <div className={'flex justify-center items-center outline rounded-md'}>
      <ProjectDialog>
        <div>추가</div>
      </ProjectDialog>
    </div>
  );
};

export default NewProject;
