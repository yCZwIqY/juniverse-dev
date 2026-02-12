'use client';

import { Pagination, PostData } from 'apis';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/app/_libs/posts';
import { useState } from 'react';
import Modal from '@/app/_components/common/Modal';

interface PostTableProps extends Pagination {
  data: PostData[];
}

const PostTable = ({ data }: PostTableProps) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('확인 결과');
  const [modalText, setModalText] = useState('');


  const requestInspect = async (id: number) => {
    try {
      setLoadingId(id);
      const res = await fetch('/api/search-console/inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: `/posts/${id}` }),
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setModalTitle('확인 실패');
        setModalText(payload?.error ?? `요청 실패 (status: ${res.status})`);
        setModalOpen(true);
        return;
      }

      const inspection = payload?.result?.inspectionResult;
      const indexStatus = inspection?.indexStatusResult;
      const verdict = indexStatus?.verdict ?? '-';
      const coverageState = indexStatus?.coverageState ?? '-';
      const lastCrawlTime = indexStatus?.lastCrawlTime ?? '-';
      const requestUrl = payload?.requestUrl;

      setModalTitle('확인 결과');
      setModalText(
        [
          `URL: ${requestUrl}`,
          `판정: ${verdict}`,
          `커버리지 상태: ${coverageState}`,
          `마지막 크롤링: ${lastCrawlTime}`,
          '',
          '원본 응답(JSON):',
          JSON.stringify(payload?.result ?? payload, null, 2),
        ].join('\n'),
      );
      setModalOpen(true);
    } finally {
      setLoadingId(null);
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
                disabled={loadingId === post.id}
                onClick={(e) => {
                  e.stopPropagation();
                  requestInspect(post.id);
                }}
                className={'text-emerald-200 border border-emerald-300/50 px-3 py-1 rounded-lg hover:bg-emerald-400/10'}>
                {loadingId === post.id ? '확인 중...' : '색인 생성 확인'}
              </button>
            </div>
          </div>
        </div>
      ))}
      <Modal
        open={modalOpen}
        title={modalTitle}
        confirmText="확인"
        cancelText="닫기"
        onConfirm={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <pre className="max-h-[55vh] overflow-auto whitespace-pre-wrap text-xs text-gray-100 bg-black/30 rounded-lg p-3">
          {modalText}
        </pre>
      </Modal>
    </div>
  );
};

export default PostTable;
