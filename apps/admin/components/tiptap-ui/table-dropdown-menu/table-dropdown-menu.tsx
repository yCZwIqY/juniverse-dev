'use client';

import { useCallback, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { Columns3, Rows3, Table2 } from 'lucide-react';

import { useTiptapEditor } from '@/hooks/use-tiptap-editor';
import type { ButtonProps } from '@/components/tiptap-ui-primitive/button';
import { Button } from '@/components/tiptap-ui-primitive/button';
import { Card, CardBody } from '@/components/tiptap-ui-primitive/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/tiptap-ui-primitive/dropdown-menu';
import { ChevronDownIcon } from '@/components/tiptap-icons/chevron-down-icon';

type TableAction = {
  label: string;
  icon: typeof Table2;
  isEnabled: (editor: Editor) => boolean;
  onSelect: () => void;
};

export interface TableDropdownMenuProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null;
  portal?: boolean;
}

export function TableDropdownMenu({ editor: providedEditor, portal = false, ...props }: TableDropdownMenuProps) {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = useState(false);

  const preserveSelection = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  const runCommand = useCallback(
    (command: (currentEditor: Editor) => boolean) => {
      if (!editor) return;
      command(editor);
      setIsOpen(false);
    },
    [editor],
  );

  const actions: TableAction[] = [
    {
      label: '3x3 Table',
      icon: Table2,
      isEnabled: (currentEditor) => currentEditor.can().chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
      onSelect: () => runCommand((currentEditor) => currentEditor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()),
    },
    {
      label: 'Header Row',
      icon: Table2,
      isEnabled: (currentEditor) => currentEditor.can().chain().focus().toggleHeaderRow().run(),
      onSelect: () => runCommand((currentEditor) => currentEditor.chain().focus().toggleHeaderRow().run()),
    },
    {
      label: 'Add Row Before',
      icon: Rows3,
      isEnabled: (currentEditor) => currentEditor.can().chain().focus().addRowBefore().run(),
      onSelect: () => runCommand((currentEditor) => currentEditor.chain().focus().addRowBefore().run()),
    },
    {
      label: 'Add Row After',
      icon: Rows3,
      isEnabled: (currentEditor) => currentEditor.can().chain().focus().addRowAfter().run(),
      onSelect: () => runCommand((currentEditor) => currentEditor.chain().focus().addRowAfter().run()),
    },
    {
      label: 'Delete Row',
      icon: Rows3,
      isEnabled: (currentEditor) => currentEditor.can().chain().focus().deleteRow().run(),
      onSelect: () => runCommand((currentEditor) => currentEditor.chain().focus().deleteRow().run()),
    },
    {
      label: 'Add Column Before',
      icon: Columns3,
      isEnabled: (currentEditor) => currentEditor.can().chain().focus().addColumnBefore().run(),
      onSelect: () => runCommand((currentEditor) => currentEditor.chain().focus().addColumnBefore().run()),
    },
    {
      label: 'Add Column After',
      icon: Columns3,
      isEnabled: (currentEditor) => currentEditor.can().chain().focus().addColumnAfter().run(),
      onSelect: () => runCommand((currentEditor) => currentEditor.chain().focus().addColumnAfter().run()),
    },
    {
      label: 'Delete Column',
      icon: Columns3,
      isEnabled: (currentEditor) => currentEditor.can().chain().focus().deleteColumn().run(),
      onSelect: () => runCommand((currentEditor) => currentEditor.chain().focus().deleteColumn().run()),
    },
    {
      label: 'Delete Table',
      icon: Table2,
      isEnabled: (currentEditor) => currentEditor.can().chain().focus().deleteTable().run(),
      onSelect: () => runCommand((currentEditor) => currentEditor.chain().focus().deleteTable().run()),
    },
  ];

  if (!editor) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          data-active-state={editor.isActive('table') ? 'on' : 'off'}
          aria-label="Table options"
          tooltip="Table"
          role="button"
          tabIndex={-1}
          onMouseDown={preserveSelection}
          {...props}
        >
          <Table2 className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" portal={portal}>
        <Card>
          <CardBody className="flex min-w-52 flex-col gap-1">
            {actions.map((action) => {
              const Icon = action.icon;
              const isEnabled = action.isEnabled(editor);

              return (
                <DropdownMenuItem key={action.label} asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    disabled={!isEnabled}
                    data-disabled={!isEnabled}
                    className="w-full justify-start gap-2"
                    showTooltip={false}
                    onMouseDown={preserveSelection}
                    onClick={action.onSelect}
                  >
                    <Icon className="tiptap-button-icon" />
                    <span className="tiptap-button-text">{action.label}</span>
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TableDropdownMenu;
