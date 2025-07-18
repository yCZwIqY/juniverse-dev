'use client';

import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { EditorContent, useEditor } from '@tiptap/react';
import Link from '@tiptap/extension-link';
import HardBreak from '@tiptap/extension-hard-break';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import History from '@tiptap/extension-history';
import Blockquote from '@tiptap/extension-blockquote';
import Image from '@tiptap/extension-image';
import RichTextToolbar from './RichTextToolbar';
import RichTextPopover from './RichTextPopover';
import { TextAlign } from '@tiptap/extension-text-align';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import PrismCodeBlock from './PrismCodeBlock';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-gradle';

interface FormRichTextProps {
  label: string;
  name: string;
}

const FormRichText = ({ label, name }: FormRichTextProps) => {
  const { control, getValues, setValue } = useFormContext();

  const editor = useEditor({
    content: getValues(name),
    extensions: [
      Heading,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Paragraph.configure({
        HTMLAttributes: {
          class: 'text-left',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link,
      Document,
      HardBreak,
      Text,
      HorizontalRule,
      BulletList,
      OrderedList,
      ListItem,
      History,
      Image,
      Code,
      CodeBlock,
      Blockquote,
      PrismCodeBlock,
    ],
  });

  useEffect(() => {
    if (!editor) return;

    const initialContent = getValues(name);
    if (initialContent) {
      editor.commands.setContent(initialContent);
    }

    editor.on('update', () => {
      setValue(name, editor.getHTML(), {
        shouldDirty: true,
      });
    });
  }, [editor, getValues, name, setValue]);

  return (
    <div className={'flex flex-col gap-3'}>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={() => (
          <div className={'border rounded-md p-2'}>
            <div className={'mb-2 border-b pb-2'}>
              <RichTextToolbar editor={editor!} />
              <RichTextPopover editor={editor!} />
            </div>
            <EditorContent className={'no-preflight'} editor={editor} />
          </div>
        )}
      />
    </div>
  );
};

export default FormRichText;
