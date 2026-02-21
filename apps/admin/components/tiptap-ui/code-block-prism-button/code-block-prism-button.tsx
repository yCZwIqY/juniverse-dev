import { mergeAttributes, Node } from '@tiptap/core';
import type { NodeViewProps } from '@tiptap/react';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';

const languages = ['javascript', 'typescript', 'css', 'html', 'bash', 'java', 'sql', 'jsx', 'tsx', 'yaml', 'docker', 'gradle', 'dart'];

const CodeBlockPrismButton = ({ node, updateAttributes }: Pick<NodeViewProps, 'node' | 'updateAttributes'>) => {
  const { language } = node.attrs as { language: string };
  const code = node.textContent;
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, [code, language]);

  const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateAttributes({ language: e.target.value });
  };

  return (
    <NodeViewWrapper className='code-block-wrapper'
                     style={{ position: 'relative' }}>
      <select
        value={language}
        onChange={onChangeLanguage}
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
        {languages.map((lang) => (
          <option key={lang}
                  value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre className={`language-${language}`}>
        <NodeViewContent
          spellCheck={false}
          ref={ref}
          className={`language-${language}`}
          style={{ outline: 'none', whiteSpace: 'pre-wrap' }}
        />
      </pre>
    </NodeViewWrapper>
  );
};

const PrismCodeBlock = Node.create({
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
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'pre',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ['pre', mergeAttributes(HTMLAttributes), ['code', { class: 'language-' + node.attrs.language }, 0]];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockPrismButton);
  },
});

export default PrismCodeBlock;
