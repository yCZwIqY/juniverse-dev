'use client';
import { useMenuStore } from '@/app/menus/_store';
import Button from '@/app/_components/common/Button';

const MenuAddButton = () => {
  const { addRoot } = useMenuStore();
  return (
    <Button onClick={addRoot} className={'py-2 text-white rounded-sm border-lg font-bold'}>
      루트 카테고리 추가
    </Button>
  );
};

export default MenuAddButton;
