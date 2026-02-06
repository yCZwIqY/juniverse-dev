'use client';
import React, { useEffect, useState } from 'react';

interface QuickMenusProps {
  content: string;
}

interface HeadingData {
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
}

const HEADING_STYLE_MAP: Record<HeadingData['heading'], string> = {
  h1: 'text-2xl',
  h2: 'text-xl pl-2',
  h3: 'text-lg pl-4',
  h4: 'text-base pl-6',
  h5: 'text- pl-8',
  h6: 'text-sm pl-10',
};

const QuickMenus = ({ content }: QuickMenusProps) => {
  const [heading, setHeadings] = useState<HeadingData[]>([]);
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

  const onClick = (headingData: HeadingData) => {
    const target = [...document.querySelectorAll(headingData.heading)]
      .find(el => el.textContent?.trim() === headingData.text);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <div className={'border border-border bg-card rounded-lg p-10 hidden lg:block fixed top-32 right-2 max-w-[400px] w-[calc((100dvw_-_1200px)_/_2)] overflow-auto break-words max-h-[calc(100vh_-_10rem)]'}>
      <ul className={'flex flex-col gap-2'}>
        {heading.map((el, index) => (<li className={`font-bold ${HEADING_STYLE_MAP[el.heading]} cursor-pointer`}
                                         onClick={() => onClick(el)}
                                         key={`${el.heading}-${index}`}>{el.text}</li>))}
      </ul>
    </div>
  );
};

export default QuickMenus;