import { getMenu } from 'apis';

interface ListTopProps {
  search: string;
  category: number;
}

const PostTop = async ({ search, category }: ListTopProps) => {
  const menu = await getMenu(Number(category ?? 0));

  console.log(category, menu);
  return (
    <section className={'w-full border border-border p-5 bg-card rounded-xl flex flex-col gap-4'}>
      <div className={'text-2xl font-bold'}>{category ? menu?.data.name : '전체글 보기'}</div>
      {search && <div className={'text-lg text-gray-500'}>&quot;{search}&quot; 검색 결과</div>}
    </section>
  );
};

export default PostTop;
