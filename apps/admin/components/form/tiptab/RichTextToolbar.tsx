import { Editor } from '@tiptap/react';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  CodeSquare,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  SeparatorHorizontal,
  SquareCode,
  Strikethrough,
  Undo2,
} from 'lucide-react';

type ToolbarProps = {
  editor: Editor;
};

const RichTextToolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className={'flex gap-2'}>
      <div className="icon" onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough />
      </div>
      <div className={'border-r-2'} />
      <div className="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1 />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
        <Heading4 />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
        <Heading5 />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}>
        <Heading6 />
      </div>
      <div className={'border-r-2'} />
      <div className="icon" onClick={() => editor.chain().focus().setParagraph().run()}>
        <Pilcrow />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote />
      </div>
      <div className={'border-r-2'} />
      <div className="icon" onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <ListOrdered />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <List />
      </div>
      <div className={'border-r-2'} />
      <div className="icon" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <SquareCode />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().toggleCode().run()}>
        <Code />
      </div>
      <div className={'border-r-2'} />
      <div className="icon" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <SeparatorHorizontal />
      </div>
      <div className={'border-r-2'} />
      <div className="icon" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
        <RemoveFormatting />
      </div>
      <div className={'border-r-2'} />
      <div className="icon" onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 />
      </div>
      <div className={'border-r-2'} />
      <div className="icon" onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        <AlignLeft />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().setTextAlign('center').run()}>
        <AlignCenter />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().setTextAlign('right').run()}>
        <AlignRight />
      </div>
    </div>
  );
};

export default RichTextToolbar;
