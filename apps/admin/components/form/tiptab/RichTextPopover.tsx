import { Editor } from '@tiptap/react';
import { ImageIcon, Link2, Link2Off } from 'lucide-react';
import { useCreateImage } from 'apis';
import { ChangeEvent, useRef } from 'react';

type PopoverProps = {
  editor: Editor;
};

const RichTextPopover = ({ editor }: PopoverProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadImage } = useCreateImage();

  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (const file of files) {
      formData.append('images', file);
    }

    uploadImage(formData, {
      onSuccess: (res) => {
        res.result.forEach((img) => {
          editor.chain().focus().setImage({ src: img.src }).run();
        });
        event.target.value = '';
      },
      onError: (err) => {
        console.error('업로드 실패:', err);
      },
    });
  };

  return (
    <div className={'flex  gap-2'}>
      <label className="icon" htmlFor={'rich-text-input'}>
        <ImageIcon />
      </label>
      <input id={'rich-text-input'} type="file" accept="image/*" multiple ref={fileInputRef} onChange={onUploadImage} className="hidden" />
      <div
        onClick={() => {
          const url = window.prompt('링크 주소를 입력하세요');
          if (url) {
            editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }
        }}
      >
        <Link2 />
      </div>
      <div onClick={() => editor?.chain().focus().unsetLink().run()}>
        <Link2Off />
      </div>
    </div>
  );
};

export default RichTextPopover;
