'use client';
import { useMenuStore } from '@/app/(protected)/menus/_store';
import Input from '@/app/(protected)/_components/common/Input';
import { useEffect, useState } from 'react';
import Button from '@/app/(protected)/_components/common/Button';
import { createMenu, deleteMenu, updateMenu } from '@/app/(protected)/_libs/menus';
import Modal from '@/app/(protected)/_components/common/Modal';

const MenuForm = () => {
  const { selectedMenu } = useMenuStore();
  const [name, setName] = useState<string>('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

  const onDelete = async () => {
    if (!selectedMenu?.id) return;
    await deleteMenu(selectedMenu.id);
    setIsDeleteOpen(false);
  };

  const onSubmit = () => {
    if (!name || name.length < 1) return;
    if (selectedMenu?.id) onUpdate(selectedMenu?.id);
    else onCreate();
  };

  return (
    <div className={'h-fit flex flex-col p-2 gap-2 text-base md:text-lg text-gray-100'}>
      {selectedMenu?.parent && (
        <>
          <label className={'flex items-center text-gray-300'}>상위 메뉴</label>
          <div className="text-white">{selectedMenu?.parent?.name}</div>
        </>
      )}
      <label id={'name'} htmlFor={'name'} className={'flex items-center text-gray-300 block'}>
        카테고리 이름
      </label>
      <Input id={'name'} value={name} onChange={(e) => setName(e.target.value)} />
      <div className={'col-span-2 flex gap-2'}>
        <Button className={'flex-1 flex justify-center rounded-md text-center py-2 bg-cyan-500/80 hover:bg-cyan-400 text-white border border-cyan-300/50'} onClick={onSubmit}>
          {selectedMenu?.id ? '수정하기' : '추가하기'}
        </Button>
        {!!selectedMenu?.id && (
          <Button
            className={'flex-1 flex justify-center rounded-md text-center py-2 bg-transparent text-red-200 border border-red-400/70 hover:bg-red-500/20'}
            onClick={() => setIsDeleteOpen(true)}
          >
            삭제하기
          </Button>
        )}
      </div>
      <Modal
        open={isDeleteOpen}
        title="메뉴 삭제"
        description="이 메뉴와 하위 메뉴의 모든 포스트가 삭제됩니다. 계속하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={onDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </div>
  );
};

export default MenuForm;
