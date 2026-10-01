'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Pagination, PostData } from 'apis';
import { Badge, Button } from 'components';
import { deletePost } from '@/app/(protected)/_libs/posts';
import Modal from '@/app/(protected)/_components/common/Modal';

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
        const err = payload?.error;
        setModalText(err ? (typeof err === 'string' ? err : JSON.stringify(err, null, 2)) : `요청 실패 (status: ${res.status})`);
        setModalOpen(true);
        return;
      }

      const inspection = payload?.result?.inspectionResult;
      const indexStatus = inspection?.indexStatusResult;
      setModalTitle('색인 확인 결과');
      setModalText(
        [
          `URL: ${payload?.requestUrl}`,
          `판정: ${indexStatus?.verdict ?? '-'}`,
          `커버리지: ${indexStatus?.coverageState ?? '-'}`,
          `마지막 크롤링: ${indexStatus?.lastCrawlTime ?? '-'}`,
          '',
          JSON.stringify(payload?.result ?? payload, null, 2),
        ].join('\n'),
      );
      setModalOpen(true);
    } catch (e) {
      setModalTitle('오류');
      setModalText(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
      setModalOpen(true);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {data.map((post) => (
        <div
          key={post.id}
          className="glass-card p-4 cursor-pointer hover:bg-[var(--color-surface-soft)] transition-colors"
          onClick={() => router.push(`/posts/${post.id}`)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-[var(--muted-foreground)]">#{post.id}</span>
                {post.status === 'DRAFT' && <Badge variant="secondary">임시저장</Badge>}
              </div>
              <div className="text-sm font-semibold text-[var(--color-ink)] line-clamp-1">{post.title}</div>
              <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                {post.menu?.name ?? '-'} · 조회수 {post.viewCount} · {new Date(post.createdAt).toLocaleDateString('ko-KR')}
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); requestInspect(post.id); }}
                loading={loadingId === post.id}
              >
                색인 확인
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => { e.stopPropagation(); deletePost(post.id.toString()); }}
              >
                삭제
              </Button>
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
        <pre className="max-h-[55vh] overflow-auto whitespace-pre-wrap text-xs text-[var(--color-ink)] bg-[var(--color-surface-soft)] rounded-[var(--radius-sm)] p-3">
          {modalText}
        </pre>
      </Modal>
    </div>
  );
};

export default PostTable;
