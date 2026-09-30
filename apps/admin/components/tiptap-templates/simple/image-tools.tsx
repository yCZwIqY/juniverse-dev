'use client';

import { useRef, useState } from 'react';
import 'components/src/tiptap/editor-kit/ui/table-dropdown-menu/editor-tools-panel.scss';
import { ImagePlus } from 'lucide-react';
import { useTiptapEditor } from 'components/src/tiptap/editor-kit/hooks/use-tiptap-editor';
import { Button } from 'components/src/tiptap/editor-kit/ui-primitive/button';
import { Popover, PopoverContent, PopoverTrigger } from 'components/src/tiptap/editor-kit/ui-primitive/popover';
import { handleImageUpload } from '@/lib/tiptap-image-upload';

export function ImageTools({ postId }: { postId: string }) {
  const { editor } = useTiptapEditor();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(0);
  const target = useRef<{ from: number; to: number; image: boolean }>({ from: 0, to: 0, image: false });
  const changeOpen = (next: boolean) => {
    request.current++;
    setOpen(next);
    setBusy(false);
    setError('');
    setFile(null);
    if (next && editor) {
      target.current = { from: editor.state.selection.from, to: editor.state.selection.to, image: editor.isActive('image') };
      const attrs = editor.isActive('image') ? editor.getAttributes('image') : {};
      setAlt(attrs.alt || ''); setWidth(String(attrs.width || '')); setHeight(String(attrs.height || ''));
    }
  };
  const save = async () => {
    if (!editor || busy) return;
    if ([width, height].some(v => v !== '' && (!/^\d+$/.test(v) || Number(v) < 1 || Number(v) > 10000))) {
      setError('크기는 1~10000px로 입력하거나 자동 크기는 비워주세요.'); return;
    }
    if (!target.current.image && !file) { setError('이미지를 선택해주세요.'); return; }
    if (file && !file.type.startsWith('image/')) { setError('이미지 파일을 선택해주세요.'); return; }
    const id = ++request.current;
    setBusy(true); setError('');
    try {
      const src = file ? await handleImageUpload(postId, file) : undefined;
      if (id !== request.current || editor.isDestroyed) return;
      const attrs = { alt, width: width ? Number(width) : null, height: height ? Number(height) : null, ...(src ? { src } : {}) };
      const { from, to, image } = target.current;
      if (image) editor.chain().focus().setNodeSelection(from).updateAttributes('image', attrs).run();
      else editor.chain().focus().insertContentAt({ from, to }, { type: 'image', attrs }).run();
      changeOpen(false);
    } catch (e) {
      if (id === request.current) setError(e instanceof Error ? e.message : '이미지 업로드에 실패했습니다.');
    } finally { if (id === request.current) setBusy(false); }
  };
  return <Popover open={open} onOpenChange={changeOpen} modal>
    <PopoverTrigger asChild><Button type="button" data-style="ghost" aria-label="이미지 삽입 및 편집" tooltip="이미지"><ImagePlus className="tiptap-button-icon" /></Button></PopoverTrigger>
    <PopoverContent className="editor-tools-panel" align="start" onCloseAutoFocus={e => e.preventDefault()}>
      <strong>{target.current.image ? '이미지 편집' : '이미지 삽입'}</strong>
      <label>파일 <input type="file" accept="image/*" disabled={busy} onChange={e => setFile(e.target.files?.[0] || null)} /></label>
      <label>대체 텍스트 <input value={alt} disabled={busy} onChange={e => setAlt(e.target.value)} /></label>
      <label>너비(px) <input type="number" min={1} max={10000} placeholder="자동" value={width} disabled={busy} onChange={e => setWidth(e.target.value)} /></label>
      <label>높이(px) <input type="number" min={1} max={10000} placeholder="자동" value={height} disabled={busy} onChange={e => setHeight(e.target.value)} /></label>
      <p>모서리를 드래그하면 비율을 유지하며 크기를 조절할 수 있습니다.</p>
      {error && <p role="alert">{error}</p>}
      <button type="button" disabled={busy} onClick={() => void save()}>{busy ? '업로드 중…' : '적용'}</button>
    </PopoverContent>
  </Popover>;
}
