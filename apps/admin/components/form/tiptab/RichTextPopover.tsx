import { Editor } from '@tiptap/react';
import { ImageIcon } from 'lucide-react';
import { useCreateImage } from 'apis';
import { ChangeEvent, useRef } from 'react';

type PopoverProps = {
  editor: Editor;
};

const RichTextPopover = ({ editor }: PopoverProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadImage } = useCreateImage();

  const handleClickImage = () => {
    fileInputRef.current?.click(); // 숨겨진 파일 선택창 열기
  };

  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (const file of files) {
      formData.append('images', file); // 서버가 여러 파일을 받을 수 있도록 "images" 키 사용
    }

    uploadImage(formData, {
      onSuccess: (res) => {
        res.result.forEach((img) => {
          editor.chain().focus().setImage({ src: img.src }).run();
        });
        event.target.value = ''; // 같은 파일 다시 선택 가능하게 초기화
      },
      onError: (err) => {
        console.error('업로드 실패:', err);
      },
    });
  };

  return (
    <div>
      <label className="icon" htmlFor={'rich-text-input'}>
        <ImageIcon />
      </label>

      <input id={'rich-text-input'} type="file" accept="image/*" multiple ref={fileInputRef} onChange={onUploadImage} className="hidden" />
    </div>
  );
};

export default RichTextPopover;
