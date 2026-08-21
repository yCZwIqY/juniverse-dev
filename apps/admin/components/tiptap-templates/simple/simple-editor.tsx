'use client';

import { useEffect, useRef, useState } from 'react';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';

// --- Tiptap Core Extensions ---
// Canonical node/mark set shared with the front viewer (libs/components) so
// admin-authored content (tables, alignment, highlight, ...) always renders identically there.
import { createTiptapContentExtensions } from 'components';
import { Selection } from '@tiptap/extensions';

// --- UI Primitives ---
import { Button } from 'components/src/tiptap/editor-kit/ui-primitive/button';
import { Spacer } from 'components/src/tiptap/editor-kit/ui-primitive/spacer';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'components/src/tiptap/editor-kit/ui-primitive/toolbar';

// --- Tiptap Node ---
import { ImageUploadNode } from 'components/src/tiptap/editor-kit/nodes/image-upload-node/image-upload-node-extension';
import 'components/src/tiptap/styles/content.scss';

// --- Tiptap UI ---
import { HeadingDropdownMenu } from 'components/src/tiptap/editor-kit/ui/heading-dropdown-menu';
import { ImageUploadButton } from 'components/src/tiptap/editor-kit/ui/image-upload-button';
import { ListDropdownMenu } from 'components/src/tiptap/editor-kit/ui/list-dropdown-menu';
import { BlockquoteButton } from 'components/src/tiptap/editor-kit/ui/blockquote-button';
import { CodeBlockButton } from 'components/src/tiptap/editor-kit/ui/code-block-button';
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
} from 'components/src/tiptap/editor-kit/ui/color-highlight-popover';
import { LinkButton, LinkContent, LinkPopover } from 'components/src/tiptap/editor-kit/ui/link-popover';
import { MarkButton } from 'components/src/tiptap/editor-kit/ui/mark-button';
import { TableDropdownMenu } from 'components/src/tiptap/editor-kit/ui/table-dropdown-menu';
import { TextAlignButton } from 'components/src/tiptap/editor-kit/ui/text-align-button';
import { UndoRedoButton } from 'components/src/tiptap/editor-kit/ui/undo-redo-button';

// --- Icons ---
import { ArrowLeftIcon } from 'components/src/tiptap/editor-kit/icons/arrow-left-icon';
import { HighlighterIcon } from 'components/src/tiptap/editor-kit/icons/highlighter-icon';
import { LinkIcon } from 'components/src/tiptap/editor-kit/icons/link-icon';

// --- Hooks ---
import { useIsBreakpoint } from 'components/src/tiptap/editor-kit/hooks/use-is-breakpoint';
import { useWindowSize } from 'components/src/tiptap/editor-kit/hooks/use-window-size';
import { useCursorVisibility } from 'components/src/tiptap/editor-kit/hooks/use-cursor-visibility';

// --- Lib ---
import { MAX_FILE_SIZE } from 'components/src/tiptap/editor-kit/lib/tiptap-editor-utils';
import { handleImageUpload } from '@/lib/tiptap-image-upload';

// --- Styles ---
import '@/components/tiptap-templates/simple/simple-editor.scss';
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

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu types={['bulletList', 'orderedList', 'taskList']} portal={isMobile} />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? <ColorHighlightPopover /> : <ColorHighlightPopoverButton onClick={onHighlighterClick} />}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TableDropdownMenu portal={isMobile} />
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      <ToolbarGroup>
      </ToolbarGroup>
    </>
  );
};

const MobileToolbarContent = ({ type, onBack }: { type: 'highlighter' | 'link'; onBack: () => void }) => (
  <>
    <ToolbarGroup>
      <Button type={'button'} data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? <HighlighterIcon className="tiptap-button-icon" /> : <LinkIcon className="tiptap-button-icon" />}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? <ColorHighlightPopoverContent /> : <LinkContent />}
  </>
);

interface SimpleEditorProps {
  value: string;
  onChange: (value: string) => void;
  postId: string;
}

export function SimpleEditor({ value, onChange, postId }: SimpleEditorProps) {
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>('main');
  const toolbarRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'simple-editor',
      },
    },
    extensions: [
      ...createTiptapContentExtensions(),
      Selection,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 1,
        upload: (file) => handleImageUpload(postId, file),
        onError: (error) => console.error('Upload failed:', error),
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();

    if (current === value) return;

    editor.commands.setContent(value || '');
  }, [editor, value]);

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main');
    }
  }, [isMobile, mobileView]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar
        ref={toolbarRef}
        style={{
          ...(isMobile
            ? {
                bottom: `calc(100% - ${height - rect.y}px)`,
              }
            : {}),
        }}
      >
        {mobileView === 'main' ? (
          <MainToolbarContent
            onHighlighterClick={() => setMobileView('highlighter')}
            onLinkClick={() => setMobileView('link')}
            isMobile={isMobile}
          />
        ) : (
          <MobileToolbarContent type={mobileView === 'highlighter' ? 'highlighter' : 'link'} onBack={() => setMobileView('main')} />
        )}
      </Toolbar>

      <EditorContent editor={editor} role="presentation" className="simple-editor-content" />
    </EditorContext.Provider>
  );
}
