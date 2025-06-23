'use client';
import { ReactNode } from 'react';

interface SkillItemProps {
  children: ReactNode;
  selected: boolean;
}

const SkillItem = ({ children, selected }: SkillItemProps) => {
  return (
    <div
      className={`w-[48px] h-[48px] p-2 text-xs break-all md:break-keep text-center md:text-sm md:w-[85px] md:h-[85px] flex justify-center items-center rounded-md transition-all
        ${selected ? 'text-white bg-primary scale-105' : 'border text-primary border-primary'}`}
    >
      {children}
    </div>
  );
};

export default SkillItem;
