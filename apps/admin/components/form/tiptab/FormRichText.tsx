'use client';

import React, { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import HardBreak from '@tiptap/extension-hard-break';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import History from '@tiptap/extension-history';
import Image from '@tiptap/extension-image';
import RichTextToolbar from './RichTextToolbar';
import RichTextPopover from './RichTextPopover';

interface FormRichTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const FormRichText = ({ label, name }: FormRichTextProps) => {
  const { control } = useFormContext();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Link,
      CodeBlock,
      HardBreak,
      HorizontalRule,
      BulletList,
      OrderedList,
      ListItem,
      History,
      Image,
    ],
  });

  return (
    <div className={'flex flex-col gap-3'}>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <div className={'mb-2'}>
              <RichTextToolbar editor={editor!} />
              <RichTextPopover editor={editor!} />
            </div>
            <EditorContent className={'no-preflight'} editor={editor} value={field.value} />
          </div>
        )}
      />
    </div>
  );
};

export default FormRichText;
