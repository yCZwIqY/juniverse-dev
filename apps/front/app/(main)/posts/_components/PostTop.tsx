import { getMenu } from 'apis';

interface ListTopProps {
  search: string;
  category: number;
}

const PostTop = async ({ search, category }: ListTopProps) => {
  const menu = category ? await getMenu(Number(category)) : null;

  return (
    <section className="color-block-section reveal">
      <div className="eyebrow mb-1">{category ? 'Category' : 'All Posts'}</div>
      <h1 className="text-2xl font-bold text-[var(--color-ink)]">
        {category ? (menu?.data.name ?? '카테고리') : '전체글 보기'}
      </h1>
      {search && (
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          &quot;{search}&quot; 검색 결과
        </p>
      )}
    </section>
  );
};

export default PostTop;
