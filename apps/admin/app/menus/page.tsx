import MenuList from '@/app/menus/_components/MenuList';
import MenuForm from '@/app/menus/_components/MenuForm';

export const dynamic = 'force-dynamic';

const MenuPage = () => {
  return (
    <div className={'flex flex-col gap-6 md:gap-10 h-full overflow-hidden'}>
      <div className={'text-2xl font-bold text-white tracking-tight'}>카테고리 수정</div>
      <div className={'flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[1000px] m-auto w-full'}>
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-4">
          <MenuList />
        </div>
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-4">
          <MenuForm />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
