'use client';

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';

/** 리사이즈 핸들 위치 */
type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const CORNERS: Corner[] = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

/** 최소 이미지 너비(px) */
const MIN_WIDTH = 40;

/**
 * 에디터 입력창 안에서 마우스로 크기를 조절할 수 있는 이미지 노드 뷰.
 * 이미지가 선택되면 primary 테두리와 네 모서리 핸들이 나타나고,
 * 핸들을 드래그하면 종횡비를 유지하며 크기가 바뀐다.
 * 읽기 전용(뷰어)에서는 핸들을 렌더링하지 않는다.
 *
 * Image 노드는 draggable 이라 핸들을 누르면 브라우저의 네이티브 드래그가
 * 리사이즈를 가로챈다. 이를 막기 위해 래퍼의 draggable 을 끄고,
 * 리사이즈 중에는 dragstart 를 무력화한다.
 */
export function ResizableImageView({
  node,
  updateAttributes,
  selected,
  editor,
}: NodeViewProps) {
  const { src, alt, title, width, height } = node.attrs as {
    src: string;
    alt?: string | null;
    title?: string | null;
    width?: number | string | null;
    height?: number | string | null;
  };
  const imgRef = useRef<HTMLImageElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanupRef.current?.(), []);

  const startResize = (
    event: ReactPointerEvent<HTMLSpanElement>,
    corner: Corner,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const img = imgRef.current;
    if (!img) return;
    cleanupRef.current?.();

    const startX = event.clientX;
    const startWidth = img.offsetWidth;
    const startHeight = img.offsetHeight;
    const aspect = startHeight > 0 ? startWidth / startHeight : 1;
    const growsRight = corner === 'top-right' || corner === 'bottom-right';

    const preventDrag = (dragEvent: Event) => dragEvent.preventDefault();

    const onMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      const maxWidth = img.closest('.tiptap')?.clientWidth || 10000;
      const nextWidth = Math.min(maxWidth, Math.max(
        MIN_WIDTH,
        Math.round(growsRight ? startWidth + delta : startWidth - delta),
      ));
      const nextHeight = Math.round(nextWidth / aspect);
      updateAttributes({ width: nextWidth, height: nextHeight });
    };

    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);
      document.removeEventListener('dragstart', preventDrag, true);
      cleanupRef.current = null;
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
    document.addEventListener('dragstart', preventDrag, true);
    cleanupRef.current = onUp;
  };

  const isEditable = editor.isEditable;

  // 숫자 너비만 px 로 래퍼에 반영한다. ("50%" 등 비-픽셀 값은 img 속성에 그대로 위임)
  const numericWidth =
    typeof width === 'number'
      ? width
      : width != null && /^\d+$/.test(String(width))
        ? Number(width)
        : null;

  return (
    <NodeViewWrapper
      className='tiptap-resizable-image'
      data-selected={isEditable && selected ? 'true' : undefined}
      draggable={false}
      style={{ width: numericWidth ? `${numericWidth}px` : undefined }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt ?? undefined}
        title={title ?? undefined}
        width={width ?? undefined}
        height={height ?? undefined}
        draggable={false}
        style={{
          width: numericWidth ? '100%' : undefined,
          height: !numericWidth && Number(height) > 0 ? `${Number(height)}px` : undefined,
          aspectRatio: numericWidth && Number(height) > 0 ? `${numericWidth} / ${Number(height)}` : undefined,
        }}
      />

      {isEditable &&
        selected &&
        CORNERS.map((corner) => (
          <span
            key={corner}
            className='tiptap-resizable-image-handle'
            data-corner={corner}
            contentEditable={false}
            onPointerDown={(event) => startResize(event, corner)}
            onDragStart={(event) => event.preventDefault()}
          />
        ))}
    </NodeViewWrapper>
  );
}

export default ResizableImageView;
