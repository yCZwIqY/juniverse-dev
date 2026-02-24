'use client';
import React, { useEffect, useMemo, useState } from 'react';

interface QuickMenusProps {
  content: string;
}

interface HeadingData {
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
}

const HEADING_STYLE_MAP: Record<HeadingData['heading'], string> = {
  h1: 'text-[15px]',
  h2: 'text-[14px] pl-1',
  h3: 'text-[13px] pl-2',
  h4: 'text-[12px] pl-3',
  h5: 'text-[11px] pl-4',
  h6: 'text-[10px] pl-5',
};

const QuickMenus = ({ content }: QuickMenusProps) => {
  const [heading, setHeadings] = useState<HeadingData[]>([]);
  const [focusHeading, setFocusHeading] = useState<number>(-1);
  useEffect(() => {
    if (!content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const headingEls = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const list: HeadingData[] = Array.from(headingEls).map((el) => ({
      heading: el.tagName.toLowerCase() as HeadingData['heading'],
      text: el.textContent?.trim() ?? '',
    }));

    setHeadings(list);
  }, [content]);

  const headingSelector = useMemo(() => 'h1, h2, h3, h4, h5, h6', []);

  const onClick = (headingData: HeadingData) => {
    const container = document.querySelector('[data-editor-viewer]');
    const scope = container ?? document;
    const target = [...scope.querySelectorAll(headingData.heading)]
      .find((el) => el.textContent?.trim() === headingData.text);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!heading.length) return;

    const container = document.querySelector('[data-editor-viewer]');
    if (!container) return;

    const headingEls = Array.from(container.querySelectorAll(headingSelector));
    if (!headingEls.length) return;

    const elementToIndex = new Map<Element, number>();
    const intersecting = new Map<Element, boolean>();

    headingEls.forEach((el, index) => {
      elementToIndex.set(el, index);
      intersecting.set(el, false);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersecting.set(entry.target, entry.isIntersecting);
        });

        const visible = headingEls.filter((el) => intersecting.get(el));
        if (!visible.length) return;

        let best = visible[0];
        let bestTop = best.getBoundingClientRect().top;

        visible.slice(1).forEach((el) => {
          const top = el.getBoundingClientRect().top;
          if (top >= -20 && top < bestTop) {
            best = el;
            bestTop = top;
          }
        });

        const index = elementToIndex.get(best);
        if (typeof index === 'number') {
          setFocusHeading(index);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -60% 0px',
      },
    );

    headingEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [heading, headingSelector]);

  return (
    <div className={'glass-card rounded-lg p-8 hidden xl:block !fixed top-32 right-2 max-w-[400px] w-[calc((100dvw_-_1200px)_/_2)] overflow-auto break-words max-h-[calc(100vh_-_10rem)]'}>
      <ul className={'flex flex-col gap-2 overflow-y-auto'}>
        {heading.map((el, index) => (
          <li className={`font-bold ${HEADING_STYLE_MAP[el.heading]} ${focusHeading !== index ? 'text-gray-500' : ''} cursor-pointer`}
              onClick={() => onClick(el)}
              key={`${el.heading}-${index}`}>{el.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuickMenus;
