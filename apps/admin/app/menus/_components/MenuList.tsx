import { MenuData } from 'apis';
import MenuItem from '@/app/menus/_components/MenuItem';
import MenuAddButton from '@/app/menus/_components/MenuAddButton';
import { getMenuList } from 'apis';

const MenuList = async () => {
  const data = await getMenuList();

  return (
    <div className={'w-full h-full border border-white/10 bg-white/5 rounded-xl p-4 flex flex-col gap-2 text-white'}>
      <div className={'overflow-y-auto flex-1'}>
        {data?.data?.map((item: MenuData) => <MenuItem key={item.id} {...item} />)}
      </div>
      <MenuAddButton />
    </div>
  );
};

export default MenuList;
