'use client';

import '../styles/content.scss';
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
import { EditorContent, useEditor } from '@tiptap/react';
import { createTiptapContentExtensions } from '../extensions';

export interface EditorViewerProps {
  content: string;
  className?: string;
}

export const EditorViewer = ({ content, className }: EditorViewerProps) => {
  const editor = useEditor({
    extensions: createTiptapContentExtensions(),
    content,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <div className={className} data-editor-viewer>
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorViewer;
