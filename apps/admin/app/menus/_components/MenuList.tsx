import { MenuData } from '@/app/menus/_models/menu';
import MenuItem from '@/app/menus/_components/MenuItem';
import MenuAddButton from '@/app/menus/_components/MenuAddButton';
import { getMenuList } from '@/app/_libs/menus';

const MenuList = async () => {
  const data = await getMenuList();

  return (
    <div className={'w-full h-full border flex flex-col gap-2 border-r-gray-800 rounded-lg p-4'}>
      <div className={'overflow-y-auto flex-1'}>{data?.data?.map((item: MenuData) => <MenuItem key={item.id} {...item} />)}</div>
      <MenuAddButton />
    </div>
  );
};

export default MenuList;
