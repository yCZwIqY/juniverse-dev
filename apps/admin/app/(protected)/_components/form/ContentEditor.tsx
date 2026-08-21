'use client';

import { useParams } from 'next/navigation';
import { useController, useFormContext } from 'react-hook-form';

import { Label } from 'components';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

const ContentEditor = () => {
  const params = useParams();
  const { id } = params;
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name: 'content', control });

  return (
    <div className="flex flex-col gap-1.5 admin-editor">
      <Label>내용</Label>
      <div className="border border-[var(--color-hairline)] rounded-[var(--radius-sm)] overflow-hidden">
        <SimpleEditor value={value} onChange={onChange} postId={id ? id.toString() : '0'} />
      </div>
    </div>
  );
};

export default ContentEditor;
