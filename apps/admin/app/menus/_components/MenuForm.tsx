'use client';
import { useMenuStore } from '@/app/menus/_store';
import Input from '@/app/_components/common/Input';
import { useEffect, useState } from 'react';
import Button from '@/app/_components/common/Button';
import { createMenu, updateMenu } from '@/app/_libs/menus';

const MenuForm = () => {
  const { selectedMenu } = useMenuStore();
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setName(selectedMenu?.name || '');
  }, [selectedMenu]);

  const onUpdate = async (id: number) => {
    await updateMenu(id, {
      name,
      parentId: selectedMenu?.parent?.id ?? undefined,
    });
  };
  const onCreate = async () => {
    await createMenu({ name, parentId: selectedMenu?.parent?.id ?? undefined });
  };

  const onSubmit = () => {
    if (!name || name.length < 1) return;
    if (selectedMenu?.id) onUpdate(selectedMenu?.id);
    else onCreate();
  };

  return (
    <div className={'h-fit grid grid-cols-[1fr_3fr] p-2 gap-1 text-lg'}>
      {selectedMenu?.parent && (
        <>
          <label className={'flex items-center'}>상위 메뉴</label>
          <div>{selectedMenu?.parent?.name}</div>
        </>
      )}
      <label id={'name'} htmlFor={'name'} className={'flex items-center'}>
        카테고리 이름
      </label>
      <Input id={'name'} value={name} onChange={(e) => setName(e.target.value)} />
      <Button className={'flex justify-center rounded-md text-center py-2 col-span-2'} onClick={onSubmit}>
        {selectedMenu?.id ? '수정하기' : '추가하기'}
      </Button>
    </div>
  );
};

export default MenuForm;
