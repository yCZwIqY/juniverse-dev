'use client';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { useController, useFormContext } from 'react-hook-form';
import { useParams } from 'next/navigation';

const ContentEditor = () => {
  const params = useParams();
  const { id } = params;
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name: 'content',
    control,
  });

  return (
    <div className={'grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 admin-editor'}>
      <label htmlFor="content" className={'self-start font-bold text-base md:text-lg pb-2 text-left md:text-center border-b border-white/20 text-gray-200'}>
        내용
      </label>
      <div className={'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl'}>
        <SimpleEditor key={'content'} value={value} onChange={onChange} postId={id ? id.toString() : '0'} />
      </div>
    </div>
  );
};

export default ContentEditor;
