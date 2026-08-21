'use client';

import { EditorViewer as SharedEditorViewer } from 'components';

interface EditorViewerProps {
  content: string;
  className?: string;
}

const EditorViewer = ({ content, className = 'p-4 md:p-5 lg:p-6' }: EditorViewerProps) => (
  <SharedEditorViewer content={content} className={className} />
);

export default EditorViewer;
