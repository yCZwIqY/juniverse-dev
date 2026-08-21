import { format } from 'date-fns';
import Link from 'next/link';

import { getDashboardPopularPosts, getDashboardRecentComments, getDashboardSummary, getDashboardTraffic } from 'apis';
import DashboardSectionCard from '@/app/(protected)/_components/dashboard/DashboardSectionCard';
import DashboardStatCard from '@/app/(protected)/_components/dashboard/DashboardStatCard';
import TrafficChart from '@/app/(protected)/_components/dashboard/TrafficChart';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const [summary, trafficWeek, trafficMonth, trafficYear, popularPosts, recentComments] = await Promise.all([
    getDashboardSummary(),
    getDashboardTraffic('week'),
    getDashboardTraffic('month'),
    getDashboardTraffic('year'),
    getDashboardPopularPosts('week', 5),
    getDashboardRecentComments(5),
  ]);

  const todayVisitors = summary?.traffic?.today?.uniqueVisitors ?? 0;
  const totalVisitors = summary?.traffic?.total?.uniqueVisitors ?? 0;
  const todayPageViews = summary?.traffic?.today?.pageViews ?? 0;
  const totalPageViews = summary?.traffic?.total?.pageViews ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="eyebrow mb-1">Overview</div>
        <div className="text-2xl font-bold text-[var(--color-ink)]">대시보드</div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard label="오늘 방문자" value={`${todayVisitors.toLocaleString()}명`} description={`페이지뷰 ${todayPageViews.toLocaleString()}회`} />
        <DashboardStatCard label="누적 방문자" value={`${totalVisitors.toLocaleString()}명`} description={`페이지뷰 ${totalPageViews.toLocaleString()}회`} />
        <DashboardStatCard label="총 포스트" value={`${summary?.posts?.toLocaleString() ?? 0}개`} />
        <DashboardStatCard label="총 댓글" value={`${summary?.comments?.toLocaleString() ?? 0}개`} />
      </section>

      <TrafficChart week={trafficWeek} month={trafficMonth} year={trafficYear} />

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSectionCard title="최근 댓글">
          {recentComments?.length ? (
            recentComments.map((comment) => (
              <div key={comment.id} className="border border-[var(--color-hairline)] rounded-[var(--radius-sm)] p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                  <span>{comment.authorName}</span>
                  <span>{format(new Date(comment.createdAt), 'yyyy.MM.dd HH:mm')}</span>
                </div>
                <div className="text-sm text-[var(--color-ink)] line-clamp-2">{comment.content}</div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs text-[var(--muted-foreground)] truncate">포스트: {comment.postTitle}</div>
                  <Link href={`/posts/${comment.postId}`} className="text-xs font-medium underline shrink-0">
                    이동
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-[var(--muted-foreground)]">최근 댓글이 없습니다.</div>
          )}
        </DashboardSectionCard>

        <DashboardSectionCard title="인기 포스트">
          {popularPosts?.length ? (
            popularPosts.map((post, index) => (
              <div key={post.id} className="flex items-center justify-between border border-[var(--color-hairline)] rounded-[var(--radius-sm)] p-3">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-bold text-[var(--muted-foreground)] w-5 text-center">#{index + 1}</div>
                  <div className="text-sm font-medium text-[var(--color-ink)] line-clamp-1">{post.title}</div>
                </div>
                <div className="text-xs text-[var(--muted-foreground)] shrink-0">{post.views.toLocaleString()}회</div>
              </div>
            ))
          ) : (
            <div className="text-sm text-[var(--muted-foreground)]">인기 포스트 데이터가 없습니다.</div>
          )}
        </DashboardSectionCard>
      </section>
    </div>
  );
};

export default Page;
