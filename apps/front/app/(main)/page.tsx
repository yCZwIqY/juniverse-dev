import Link from 'next/link';

import HeroCard from '@/app/(main)/_components/HeroCard';
import TechStackSection from '@/app/(main)/_components/TechStackSection';
import ContactSection from '@/app/(main)/_components/ContactSection';
import LatestPosts from '@/app/(main)/_components/LatestPosts';
import RecentTags from '@/app/(main)/_components/RecentTags';
import { getRecentPosts } from 'apis';

export const revalidate = 300;

const MainPage = async () => {
  const posts = await getRecentPosts();

  return (
    <div className="py-4 flex flex-col gap-[var(--spacing-section)]">
      <HeroCard />
      <TechStackSection />

      <section className="color-block-section flex flex-col gap-6 reveal">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="eyebrow mb-1">Recent</div>
            <h2 className="text-2xl font-bold text-[var(--color-ink)]">최근 포스트</h2>
          </div>
          <Link
            href="/posts"
            prefetch={false}
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--color-ink)] transition-colors"
          >
            전체글 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <LatestPosts posts={posts ?? []} />
          <RecentTags posts={posts ?? []} />
        </div>
      </section>

      <ContactSection />
    </div>
  );
};

export default MainPage;
