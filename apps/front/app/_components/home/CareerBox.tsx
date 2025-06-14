import Tag from '@/app/_components/common/Tag';

interface CareerBoxProps {
  name: string;
  position: string;
  period: string;
  contents: string;
  tags: string[];
}

const CareerBox = ({ name, position, period, contents, tags }: CareerBoxProps) => {
  return (
    <div className={'w-full shadow-md border border-primary p-3 rounded-md transition-all hover:scale-[101%] '}>
      <div className={'flex items-center gap-1'}>
        <div className={'text-lg font-bold'}>{name}</div>
        <div className={'text-xs'}>{period}</div>
      </div>
      <div className={'text-sm font-bold text-primary'}>{position}</div>
      <div className={'text-sm my-2'}>{contents}</div>
      <div className={'flex flex-wrap gap-1'}>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
};

export default CareerBox;
