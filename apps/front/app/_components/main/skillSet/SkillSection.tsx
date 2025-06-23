'use client';
import { useTech } from 'apis';
import SkillList from '@/app/_components/main/skillSet/SkillList';
import Radio from '@/app/_components/common/Radio';
import { useState } from 'react';

export const LEVEL = [
  {
    label: 'Strong',
    value: 'STRONG',
  },
  {
    label: 'Knowledgeable',
    value: 'knowledgeable',
  },
  {
    label: 'Experienced',
    value: 'EXPERIENCED',
  },
];

export const TYPE = [
  {
    label: 'Front',
    value: 'FRONT',
  },
  {
    label: 'Back',
    value: 'BACK',
  },
  {
    label: 'Other',
    value: 'OTHER',
  },
];

const SkillSection = () => {
  const { data } = useTech();
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const front = data?.result.filter((it) => it.type === 'FRONT') ?? [];
  const back = data?.result.filter((it) => it.type === 'BACK') ?? [];
  const others = data?.result.filter((it) => it.type === 'OTHER') ?? [];

  return (
    <div
      className={'w-screen h-screen bg-primary-lighter flex flex-col py-12 gap-12 justify-center items-center'}
      id={'skill'}
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className={'uppercase text-3xl font-semibold text-primary py-3 mt-5 bg-white w-full text-center'}>Skills</div>
      <div className={'flex gap-12'}>
        <Radio options={TYPE} value={selectedType} onChange={setSelectedType} />
        <Radio options={LEVEL} value={selectedLevel} onChange={setSelectedLevel} />
      </div>
      <div className={'mx-2 rounded-lg bg-white flex-1'}>
        <div className={'flex justify-center gap-8 p-3 md:gap-28 md:p-8'}>
          <SkillList skills={front} selectedType={selectedType} selectedLevel={selectedLevel} />
          <SkillList skills={back} selectedType={selectedType} selectedLevel={selectedLevel} />
          <SkillList skills={others} selectedType={selectedType} selectedLevel={selectedLevel} />
        </div>
      </div>
    </div>
  );
};

export default SkillSection;
