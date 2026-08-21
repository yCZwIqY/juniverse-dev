'use client';

import { Plus } from 'lucide-react';

import { Button } from 'components';
import { useMenuStore } from '@/app/(protected)/menus/_store';

const MenuAddButton = () => {
  const { addRoot } = useMenuStore();
  return (
    <Button variant="outline" size="md" className="w-full" onClick={addRoot}>
      <Plus className="h-4 w-4" />
      루트 카테고리 추가
    </Button>
  );
};

export default MenuAddButton;
