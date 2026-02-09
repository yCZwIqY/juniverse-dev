import { ReactNode, MouseEvent } from 'react';

interface TagProps {
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

const Tag = ({ children, onClick, className }: TagProps) => {
  return (
    <div
      className={`break-keep whitespace-nowrap bg-card text-gray-600 py-1 px-3 cursor-pointer rounded-full border-border border text-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Tag;
