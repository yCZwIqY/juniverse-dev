import MenuList from '@/app/menus/_components/MenuList';
import MenuForm from '@/app/menus/_components/MenuForm';

const MenuPage = () => {
  return (
    <div className={'flex flex-col gap-10 h-full overflow-hidden'}>
      <div className={'text-2xl font-bold '}>카테고리 수정</div>
      <div className={'flex-1 grid grid-cols-2 gap-8 max-w-[1000px] m-auto'}>
        <MenuList />
        <MenuForm />
      </div>
    </div>
  );
};

export default MenuPage;
