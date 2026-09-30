'use client';

import { Plus } from 'lucide-react';

import { MenuData } from 'apis';
import { Button } from 'components';
import { useMenuStore } from '@/app/(protected)/menus/_store';

const MenuItem = (data: MenuData) => {
  const { select, add, selectedMenu } = useMenuStore();
  const { name, children } = data;

  return (
    <>
      <div className="flex gap-1 items-center">
        <button
          type="button"
          onClick={() => select(data)}
          className={[
            'flex-1 px-3 py-2 rounded-[var(--radius-sm)] text-sm text-left border transition-colors',
            selectedMenu?.id === data.id
              ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]'
              : 'border-[var(--color-hairline)] hover:bg-[var(--color-surface-soft)]',
          ].join(' ')}
        >
          {name}
        </button>
        <Button variant="ghost" size="icon" onClick={() => add(data)} title="하위 카테고리 추가">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {children && children.length > 0 && (
        <div className="pl-5 flex flex-col gap-1 mt-1">
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
