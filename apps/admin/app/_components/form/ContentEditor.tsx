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
    <div className={'grid grid-cols-[120px_1fr] gap-4'}>
      <label htmlFor="content" className={'self-start font-bold text-lg pb-2 text-center border-b-2 border-primary-300'}>
        내용
      </label>
      <div className={'border rounded-lg border-gray-200'}>
        <SimpleEditor key={'content'} value={value} onChange={onChange} postId={id ? id.toString() : '0'} />
      </div>
    </div>
  );
};

export default ContentEditor;
