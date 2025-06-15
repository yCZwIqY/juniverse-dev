'use client';
import React from 'react';
import ProjectItem from './ProjectItem';
import NewProject from '@/app/project/_components/NewProject';

const ProjectList = () => {
  return (
    <div className={'w-full h-full p-12'}>
      <div className={'grid grid-cols-5 gap-3'}>
        <NewProject />
        <ProjectItem id={'0'} title={'Project 1'} startDate={new Date()} endDate={new Date()} />
        <ProjectItem id={'0'} title={'Project 1'} startDate={new Date()} endDate={new Date()} />
        <ProjectItem id={'0'} title={'Project 1'} startDate={new Date()} endDate={new Date()} />
        <ProjectItem id={'0'} title={'Project 1'} startDate={new Date()} endDate={new Date()} />
        <ProjectItem id={'0'} title={'Project 1'} startDate={new Date()} endDate={new Date()} />
      </div>
    </div>
  );
};

export default ProjectList;
