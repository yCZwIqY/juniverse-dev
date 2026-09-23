'use client';

import { StarterKit } from '@tiptap/starter-kit';
import { ResizableImage } from './nodes/resizable-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Highlight } from '@tiptap/extension-highlight';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Table } from '@tiptap/extension-table';
import { TableCellWithBackground, TableHeaderWithBackground } from './nodes/table-background';
import { TableCellSplit } from './nodes/table-split';
import { TableRow } from '@tiptap/extension-table-row';
import type { AnyExtension } from '@tiptap/core';
import { HorizontalRule } from './nodes/horizontal-rule';
import { CodeBlockPrism } from './nodes/code-block-prism';
import { NodeBackground } from './editor-kit/nodes/node-background/node-background-extension';

/**
 * Canonical tiptap node/mark set shared by the admin editor and the front
 * read-only viewer, so content authored in one always renders in the other
 * (tables, alignment, highlight, etc. used to only be registered in admin).
 */
export const createTiptapContentExtensions = (): AnyExtension[] => [
  StarterKit.configure({
    horizontalRule: false,
    codeBlock: false,
    link: {
      openOnClick: false,
      enableClickSelection: true,
    },
  }),
  HorizontalRule,
  CodeBlockPrism,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Highlight.configure({ multicolor: true }),
  ResizableImage,
  Table.configure({ resizable: true }),
  TableRow,
  TableHeaderWithBackground,
  TableCellWithBackground,
  TableCellSplit,
  Typography,
  Superscript,
  Subscript,
  NodeBackground,
];

export { HorizontalRule, CodeBlockPrism, NodeBackground };
