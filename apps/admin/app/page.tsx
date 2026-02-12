import { format } from 'date-fns';
import Link from 'next/link';
import {
  getDashboardPopularPosts,
  getDashboardRecentComments,
  getDashboardSummary,
  getDashboardTraffic,
} from 'apis';
import DashboardSectionCard from '@/app/_components/dashboard/DashboardSectionCard';
import DashboardStatCard from '@/app/_components/dashboard/DashboardStatCard';
import TrafficChart from '@/app/_components/dashboard/TrafficChart';

const Page = async () => {
  const [
    summary,
    trafficWeek,
    trafficMonth,
    trafficYear,
    popularPosts,
    recentComments,
  ] = await Promise.all([
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
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold">대시보드</div>
          <div className="text-sm text-gray-400">사이트 운영 현황 요약</div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="오늘 방문자"
          value={`${todayVisitors.toLocaleString()}명`}
          description={`페이지뷰 ${todayPageViews.toLocaleString()}회`}
        />
        <DashboardStatCard
          label="누적 방문자"
          value={`${totalVisitors.toLocaleString()}명`}
          description={`페이지뷰 ${totalPageViews.toLocaleString()}회`}
        />
        <DashboardStatCard
          label="총 포스트"
          value={`${summary?.posts?.toLocaleString() ?? 0}개`}
        />
        <DashboardStatCard
          label="총 댓글"
          value={`${summary?.comments?.toLocaleString() ?? 0}개`}
        />
      </section>

      <TrafficChart week={trafficWeek} month={trafficMonth} year={trafficYear} />

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSectionCard title="최근 댓글">
          {recentComments?.length ? (
            recentComments.map((comment) => (
              <div key={comment.id} className="border border-white/10 rounded-lg p-4 bg-white/5">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{comment.authorName}</span>
                  <span>{format(new Date(comment.createdAt), 'yyyy.MM.dd HH:mm')}</span>
                </div>
                <div className="mt-2 text-sm text-gray-200 line-clamp-2">{comment.content}</div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <div className="text-xs text-gray-500 truncate">포스트: {comment.postTitle}</div>
                  <Link
                    href={`/posts/${comment.postId}`}
                    className="text-xs text-emerald-300 hover:text-emerald-200 shrink-0"
                  >
                    포스트로 이동
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400">최근 댓글이 없습니다.</div>
          )}
        </DashboardSectionCard>

        <DashboardSectionCard title="인기 포스트">
          {popularPosts?.length ? (
            popularPosts.map((post, index) => (
              <div key={post.id} className="flex items-center justify-between border border-white/10 rounded-lg p-4 bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-400">#{index + 1}</div>
                  <div className="text-sm font-medium">{post.title}</div>
                </div>
                <div className="text-sm text-emerald-200">{post.views.toLocaleString()}회</div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400">인기 포스트 데이터가 없습니다.</div>
          )}
        </DashboardSectionCard>
      </section>
    </div>
  );
};

export default Page;
