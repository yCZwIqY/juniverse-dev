'use client';

import { Pagination, PostData } from 'apis';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/app/_libs/posts';
import { useState } from 'react';

interface PostTableProps extends Pagination {
  data: PostData[];
}

const PostTable = ({ data }: PostTableProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const requestIndexing = async (id: number) => {
    try {
      setLoading(true);
      await fetch('/api/search-console/inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: `${process.env.NEXT_PUBLIC_FRONT_URL ?? 'https://juniverse-dev.com'}/posts/${id}` }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {data.map((post) => (
        <div
          key={post.id}
          className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.35)] p-4 text-white hover:shadow-[0_22px_60px_rgba(0,0,0,0.45)] transition-shadow"
          onClick={() => router.push(`/posts/${post.id}`)}
        >
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-cyan-200/80">#{post.id}</div>
              <div className="text-lg font-semibold tracking-tight">{post.title}</div>
              <div className="mt-1 text-sm text-gray-200/80">
                {post.menu?.name ?? '-'} • 조회수 {post.viewCount} • {new Date(post.createdAt).toLocaleDateString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className={'flex gap-1'}>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  deletePost(post.id.toString());
                }}
                className='text-red-200 border border-red-400/70 px-3 py-1 rounded-lg hover:bg-red-500/20'
              >
                삭제
              </button>
              <button
                disabled={loading}
                onClick={(e) => {
                  e.stopPropagation();
                  requestIndexing(post.id);
                }}
                className={'text-emerald-200 border border-emerald-300/50 px-3 py-1 rounded-lg hover:bg-emerald-400/10'}>
                색인 생성 요청
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostTable;
