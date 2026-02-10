'use client';
import { MenuData } from 'apis';
import Button from '@/app/_components/common/Button';
import { Plus } from 'lucide-react';
import { useMenuStore } from '@/app/menus/_store';

const MenuItem = (data: MenuData) => {
  const { select, add, selectedMenu } = useMenuStore();
  const { name, children } = data;
  return (
    <>
      <div className={'my-[2px]'}>
        <div className={'flex gap-1 items-center'}>
          <button
            type={'button'}
            className={`p-3 rounded-md w-full text-left border transition-colors border-white/10 bg-white/5 text-gray-100 hover:bg-white/15 hover:text-white ${
              selectedMenu?.id === data.id ? 'bg-cyan-400/20 border-cyan-300/40 text-white' : ''
            }`}
            onClick={() => select(data)}
          >
            {name}
          </button>
          <Button className={'aspect-square rounded-md h-full p-1'} onClick={() => add(data)}>
            <Plus color={'white'} />
          </Button>
        </div>
      </div>
      {children && (
        <div className={'pl-8'}>
          {children
            .sort((a, b) => a.seqNo - b.seqNo)
            .map((child: MenuData) => (
              <MenuItem key={child.id} {...child} />
            ))}
        </div>
      )}
    </>
  );
};

export default MenuItem;
