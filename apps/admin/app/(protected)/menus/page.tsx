import MenuList from '@/app/(protected)/menus/_components/MenuList';
import MenuForm from '@/app/(protected)/menus/_components/MenuForm';

export const dynamic = 'force-dynamic';

const MenuPage = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <div className="eyebrow mb-1">Configuration</div>
        <div className="text-2xl font-bold text-[var(--color-ink)]">카테고리 관리</div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px]">
        <div className="glass-card p-4 overflow-y-auto">
          <MenuList />
        </div>
        <div className="glass-card p-4 overflow-y-auto">
          <MenuForm />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
