'use client';
import '../_styles/blockquote-node/blockquote-node.scss';
import '../_styles/code-block-node/code-block-node.scss';
import '../_styles/horizontal-rule-node/horizontal-rule-node.scss';
import '../_styles/list-node/list-node.scss';
import '../_styles/image-node/image-node.scss';
import '../_styles/heading-node/heading-node.scss';
import '../_styles/paragraph-node/paragraph-node.scss';
import '../_styles/_keyframe-animations.scss';
import '../_styles/_variables.scss';
import '../_styles/simple-editor.scss';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface PostContentProps {
  content: string;
}

const PostContent = ({ content }: PostContentProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <div className={'p-10'}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default PostContent;
