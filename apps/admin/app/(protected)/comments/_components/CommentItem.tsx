import { CommentData, deleteComment } from 'apis';
import { Button } from 'components';

interface CommentItemProps {
  postId: number;
  data: CommentData;
}

const CommentItem = ({ postId, data }: CommentItemProps) => {
  const onDelete = async () => {
    await deleteComment(postId, data.id);
  };

  return (
    <div className="flex flex-col gap-2 p-3 border border-[var(--color-hairline)] rounded-[var(--radius-sm)]">
      <div>
        <div className="text-sm font-semibold text-[var(--color-ink)]">
          {data.authorName}
          <span className="text-xs text-[var(--muted-foreground)] ml-1">({data.authorId})</span>
        </div>
        <div className="text-xs text-[var(--muted-foreground)]">{data.createdAt}</div>
      </div>
      <div className="text-sm text-[var(--color-ink)]">
        {data.content.split('\n').map((line, index) => (
          <p key={`${data.id}-${index}`}>{line}</p>
        ))}
      </div>
      <Button variant="destructive" size="sm" className="self-end" onClick={onDelete}>
        삭제
      </Button>
    </div>
  );
};

export default CommentItem;
