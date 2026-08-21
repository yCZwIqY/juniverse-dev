'use client';

import { useEffect, useState } from 'react';

import { Button, Input, Label } from 'components';
import { createMenu, deleteMenu, updateMenu } from '@/app/(protected)/_libs/menus';
import Modal from '@/app/(protected)/_components/common/Modal';
import { useMenuStore } from '@/app/(protected)/menus/_store';

const MenuForm = () => {
  const { selectedMenu } = useMenuStore();
  const [name, setName] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    setName(selectedMenu?.name ?? '');
  }, [selectedMenu]);

  const onUpdate = async (id: number) => {
    await updateMenu(id, { name, parentId: selectedMenu?.parent?.id ?? undefined });
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
    if (selectedMenu?.id) onUpdate(selectedMenu.id);
    else onCreate();
  };

  return (
    <div className="flex flex-col gap-4">
      {selectedMenu?.parent && (
        <div className="flex flex-col gap-1">
          <Label className="text-[var(--muted-foreground)]">상위 메뉴</Label>
          <div className="text-sm font-medium">{selectedMenu.parent.name}</div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="menu-name">카테고리 이름</Label>
        <Input id="menu-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="카테고리 이름 입력" />
      </div>

      <div className="flex gap-2">
        <Button variant="default" size="md" className="flex-1" onClick={onSubmit} disabled={!name}>
          {selectedMenu?.id ? '수정하기' : '추가하기'}
        </Button>
        {!!selectedMenu?.id && (
          <Button variant="destructive" size="md" className="flex-1" onClick={() => setIsDeleteOpen(true)}>
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
