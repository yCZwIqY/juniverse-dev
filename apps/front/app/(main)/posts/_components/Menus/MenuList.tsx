import { MenuData } from 'apis';
import MenuGroup from '@/app/(main)/posts/_components/Menus/MenuGroup';

interface MenuListProps {
  menus: MenuData[];
}

const MenuList = async ({ menus }: MenuListProps) => {

  return (
    <section className={'glass-card p-4 h-[800px]'}>
      <div className={'flex justify-between items-center pb-[10px] border-b-2 border-border'}>
        <span className={'font-bold'}>Categories</span>
      </div>
      <div className={'py-3 w-full overflow-x-auto flex flex-col gap-1'}>
        {(menus ?? []).map((menu) => (
          <MenuGroup key={menu.id} menu={menu} />
        ))}
      </div>
    </section>
  );
};

export default MenuList;
