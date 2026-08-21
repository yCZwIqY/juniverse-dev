import { ReactNode, MouseEvent } from 'react';

interface TagProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Tag = ({ children, onClick, className }: TagProps) => {
  if (onClick) {
    return (
      <button
        type="button"
        className={`chip cursor-pointer ${className ?? ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <span className={`chip ${className ?? ''}`}>
      {children}
    </span>
  );
};

export default Tag;
