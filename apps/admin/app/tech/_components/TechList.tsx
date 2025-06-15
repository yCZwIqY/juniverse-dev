'use client';

import React from 'react';
import { useTech } from 'apis';
import { Tech } from 'shared-types';
import TechItem from '@/app/tech/_components/TechItem';
import NewTech from '@/app/tech/_components/NewTech';

const TechList = () => {
  const { data } = useTech();
  const techs: Tech[] = data?.result ?? [];

  return (
    <div className={'w-full h-full p-12'}>
      <NewTech />
      {techs.length > 0 && techs.map((tech) => <TechItem key={tech.id} tech={tech} />)}
    </div>
  );
};

export default TechList;
