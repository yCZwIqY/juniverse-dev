import { Tech } from 'shared-types';
import SkillItem from '@/app/_components/main/skillSet/SkillItem';
import EmptyItem from '@/app/_components/main/skillSet/EmptyItem';

export interface SkillListProps {
  skills: Tech[];
  selectedType: string;
  selectedLevel: string;
}

const MAX = 13; // 19;
const SkillList = ({ skills, selectedType, selectedLevel }: SkillListProps) => {
  const empty = skills.length >= MAX && skills.length % 2 === 0 ? 1 : MAX - skills.length - 1;

  return (
    <div className={'grid grid-cols-2 md:grid-cols-3 gap-3'}>
      {skills.map((skill: Tech) => (
        <SkillItem
          key={skill.id!}
          selected={
            (!!selectedType || !!selectedLevel) &&
            (!selectedType || selectedType === skill.type) &&
            (!selectedLevel || selectedLevel === skill.level)
          }
        >
          {skill.name}
        </SkillItem>
      ))}
      {Array.from({ length: empty }).map((_: unknown, index: number) => (
        <EmptyItem key={index} />
      ))}
    </div>
  );
};

export default SkillList;
