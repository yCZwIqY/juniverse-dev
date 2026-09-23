import { TableCell, TableHeader } from '@tiptap/extension-table';

/**
 * 표 셀의 배경색 속성.
 * 기본 TableCell/TableHeader 는 배경색을 지원하지 않으므로 backgroundColor 속성을 추가한다.
 * renderHTML 이 반환하는 style 은 tiptap 의 mergeAttributes 가 기존 style(정렬 등)과 합쳐준다.
 */
const backgroundColorAttribute = {
  backgroundColor: {
    default: null as string | null,
    parseHTML: (element: HTMLElement) =>
      element.style.backgroundColor ||
      element.getAttribute('data-background-color') ||
      null,
    renderHTML: (attributes: { backgroundColor?: string | null }) =>
      attributes.backgroundColor
        ? {
            style: `background-color: ${attributes.backgroundColor}`,
            'data-background-color': attributes.backgroundColor,
          }
        : {},
  },
};

/** 배경색 속성이 추가된 표 셀 */
export const TableCellWithBackground = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      ...backgroundColorAttribute,
    };
  },
});

/** 배경색 속성이 추가된 표 헤더 셀 */
export const TableHeaderWithBackground = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      ...backgroundColorAttribute,
    };
  },
});
