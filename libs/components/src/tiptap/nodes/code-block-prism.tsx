'use client';

import { mergeAttributes, Node } from '@tiptap/core';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Plugin } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import type { NodeViewProps } from '@tiptap/react';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import Prism from 'prismjs';

const LANGUAGES = ['javascript', 'typescript', 'css', 'html', 'bash', 'java', 'kotlin', 'rust', 'sql', 'jsx', 'tsx', 'yaml', 'docker', 'gradle', 'dart'];

function highlightCodeBlocks(doc: ProseMirrorNode, nodeName: string) {
  const decorations: Decoration[] = [];

  doc.descendants((node, position) => {
    if (node.type.name !== nodeName) return;

    const language = node.attrs.language;
    const grammar = Object.hasOwn(Prism.languages, language) && Prism.languages[language];
    if (!grammar) return false;

    let offset = position + 1;
    function decorate(tokens: (string | Prism.Token)[]) {
      for (const token of tokens) {
        if (typeof token === 'string') {
          offset += token.length;
          continue;
        }

        const start = offset;
        decorate(Array.isArray(token.content) ? token.content : [token.content]);
        if (start < offset) {
          decorations.push(Decoration.inline(start, offset, { class: ['token', token.type, token.alias].flat().filter(Boolean).join(' ') }));
        }
      }
    }

    decorate(Prism.tokenize(node.textContent, grammar));
    return false;
  });

  return DecorationSet.create(doc, decorations);
}

const CodeBlockPrismView = ({ node, updateAttributes, editor }: Pick<NodeViewProps, 'node' | 'updateAttributes' | 'editor'>) => {
  const { language } = node.attrs as { language: string };

  const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateAttributes({ language: e.target.value });
  };

  return (
    <NodeViewWrapper className="code-block-wrapper" style={{ position: 'relative' }}>
      {editor.isEditable && (
        <select
          value={language}
          onChange={onChangeLanguage}
          contentEditable={false}
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 10,
            background: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '2px 6px',
            fontSize: 12,
          }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      )}
      <pre className={`language-${language}`}>
        <NodeViewContent<'code'>
          as="code"
          spellCheck={false}
          className={`language-${language}`}
          style={{ outline: 'none', whiteSpace: 'pre-wrap' }}
        />
      </pre>
    </NodeViewWrapper>
  );
};

export const CodeBlockPrism = Node.create({
  name: 'codeBlock',
  content: 'text*',
  marks: '',
  group: 'block',
  code: true,
  defining: true,

  addAttributes() {
    return {
      language: {
        default: 'javascript',
        parseHTML: (element) => element.getAttribute('language')
          ?? element.querySelector('code')?.className.match(/(?:^|\s)language-([^\s]+)/)?.[1]
          ?? element.className.match(/(?:^|\s)language-([^\s]+)/)?.[1]
          ?? 'javascript',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'pre', preserveWhitespace: 'full' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ['pre', mergeAttributes(HTMLAttributes), ['code', { class: 'language-' + node.attrs.language }, 0]];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockPrismView);
  },

  addProseMirrorPlugins() {
    const nodeName = this.name;
    return [new Plugin<DecorationSet>({
      state: {
        init: (_, state) => highlightCodeBlocks(state.doc, nodeName),
        apply: (transaction, previous) => transaction.docChanged
          ? highlightCodeBlocks(transaction.doc, nodeName)
          : previous,
      },
      props: {
        decorations(state) {
          return this.getState(state);
        },
      },
    })];
  },
});

export default CodeBlockPrism;
