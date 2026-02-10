'use client';

import { Pagination, PostData } from 'apis';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/app/_libs/posts';

interface PostTableProps extends Pagination {
  data: PostData[];
}

const PostTable = ({ data }: PostTableProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      {data.map((post) => (
        <div
          key={post.id}
          className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.35)] p-4 text-white hover:shadow-[0_22px_60px_rgba(0,0,0,0.45)] transition-shadow"
          onClick={() => router.push(`/posts/${post.id}`)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-cyan-200/80">#{post.id}</div>
              <div className="text-lg font-semibold tracking-tight">{post.title}</div>
              <div className="mt-1 text-sm text-gray-200/80">
                {post.menu?.name ?? '-'} • 조회수 {post.viewCount}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deletePost(post.id.toString());
              }}
              className="text-red-200 border border-red-400/70 px-3 py-1 rounded-lg hover:bg-red-500/20"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostTable;
