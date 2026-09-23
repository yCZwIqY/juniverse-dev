import { Image } from '@tiptap/extension-image';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ResizableImageView } from './resizable-image-view';

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null, parseHTML: element => element.getAttribute('width') },
      height: { default: null, parseHTML: element => element.getAttribute('height') },
    };
  },
  addNodeView() { return ReactNodeViewRenderer(ResizableImageView); },
});
