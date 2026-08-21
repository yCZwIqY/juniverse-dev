import { MenuData } from 'apis';

import { getMenuList } from 'apis';
import MenuAddButton from '@/app/(protected)/menus/_components/MenuAddButton';
import MenuItem from '@/app/(protected)/menus/_components/MenuItem';

const MenuList = async () => {
  const data = await getMenuList();

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {data?.data?.map((item: MenuData) => <MenuItem key={item.id} {...item} />)}
      </div>
      <MenuAddButton />
    </div>
  );
};

export default MenuList;
