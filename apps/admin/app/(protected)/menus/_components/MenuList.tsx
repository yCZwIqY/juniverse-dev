import { MenuData } from 'apis';
import MenuItem from '@/app/(protected)/menus/_components/MenuItem';
import MenuAddButton from '@/app/(protected)/menus/_components/MenuAddButton';
import { getMenuList } from 'apis';

const MenuList = async () => {
  const data = await getMenuList();

  return (
    <div className={'w-full h-full p-4 flex flex-col gap-2 text-white'}>
      <div className={'overflow-y-auto flex-1'}>
        {data?.data?.map((item: MenuData) => <MenuItem key={item.id} {...item} />)}
      </div>
      <MenuAddButton />
    </div>
  );
};

export default MenuList;
