import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({ ...props }: ButtonProps) => {
  return (
    <button
      type={'button'}
      {...props}
      className={`text-white font-bold bg-white/10 border border-white/15 hover:bg-white/20 active:bg-white/30 ${props.className}`}
    />
  );
};

export default Button;
