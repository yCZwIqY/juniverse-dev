import { ReactNode, MouseEvent } from 'react';

interface TagProps {
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

const Tag = ({ children, onClick, className }: TagProps) => {
  return (
    <div
      className={`chip cursor-pointer ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Tag;
