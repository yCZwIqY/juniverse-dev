import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({ ...props }: ButtonProps) => {
  return (
    <button
      type={'button'}
      {...props}
      className={` text-white  font-bold bg-primary-500 hover:bg-primary-600 active:bg-primary-700  ${props.className}`}
    />
  );
};

export default Button;
