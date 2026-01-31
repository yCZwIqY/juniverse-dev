import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {};
const Input = ({ ...props }: InputProps) => {
  return (
    <span className={'border border-gray-300 rounded-lg px-2 py-1'}>
      <input {...props} className={`w-full h-full outline-none border-none ${props.className}`} />
    </span>
  );
};

export default Input;
