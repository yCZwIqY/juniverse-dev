'use client';
import '../posts/[id]/_styles/blockquote-node/blockquote-node.scss';
import '../posts/[id]/_styles/horizontal-rule-node/horizontal-rule-node.scss';
import '../posts/[id]/_styles/list-node/list-node.scss';
import '../posts/[id]/_styles/image-node/image-node.scss';
import '../posts/[id]/_styles/heading-node/heading-node.scss';
import '../posts/[id]/_styles/paragraph-node/paragraph-node.scss';
import '../posts/[id]/_styles/_keyframe-animations.scss';
import '../posts/[id]/_styles/_variables.scss';
import '../posts/[id]/_styles/simple-editor.scss';
import Prism from 'prismjs';
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
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useEffect } from 'react';


interface EditorViewerProps {
  content: string;
}

const EditorViewer = ({ content }: EditorViewerProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    immediatelyRender: false,
  });

  const highlightCodeBlocks = useCallback(() => {
    if (!editor) return;
    const root = editor.view.dom;
    const codeBlocks = root.querySelectorAll('pre > code');

    codeBlocks.forEach((codeBlock) => {
      const hasLanguage = Array.from(codeBlock.classList).some((name) => name.startsWith('language-'));
      if (!hasLanguage) {
        codeBlock.classList.add('language-javascript');
      }
      Prism.highlightElement(codeBlock as HTMLElement);
    });
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    highlightCodeBlocks();
    editor.on('update', highlightCodeBlocks);
    return () => {
      editor.off('update', highlightCodeBlocks);
    };
  }, [editor, highlightCodeBlocks]);

  return (
    <div className={'p-1 lg:p-10'} data-editor-viewer>
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorViewer;
