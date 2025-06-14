import React, { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
}
const Tag = ({ children }: TagProps) => {
  return <span className={'bg-white text-xs text-primary border border-primary px-2 py-1 rounded-md uppercase'}>{children}</span>;
};

export default Tag;
