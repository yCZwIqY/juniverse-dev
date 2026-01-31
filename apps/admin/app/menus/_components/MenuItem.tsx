'use client';
import { MenuData } from '@/app/menus/_models/menu';
import Button from '@/app/_components/common/Button';
import { Plus } from 'lucide-react';
import { useMenuStore } from '@/app/menus/_store';

const MenuItem = (data: MenuData) => {
  const { select, add, selectedMenu } = useMenuStore();
  const { name, children } = data;
  return (
    <>
      <div className={'my-px'}>
        <div className={'flex gap-1 items-center'}>
          <button
            type={'button'}
            className={`p-3 rounded-md hover:bg-primary-100 w-full text-left ${selectedMenu?.id === data.id && 'bg-primary-200'}`}
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
