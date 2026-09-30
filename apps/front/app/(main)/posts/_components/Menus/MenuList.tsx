import { MenuData } from 'apis';
import MenuGroup from '@/app/(main)/posts/_components/Menus/MenuGroup';

interface MenuListProps {
  menus: MenuData[];
}

const MenuList = async ({ menus }: MenuListProps) => {
  return (
    <section className="glass-card p-4 sticky top-24 self-start">
      <div className="eyebrow mb-3">Categories</div>
      <div className="flex flex-col gap-1">
        {(menus ?? []).map((menu) => (
          <MenuGroup key={menu.id} menu={menu} />
        ))}
      </div>
    </section>
  );
};

export default MenuList;
