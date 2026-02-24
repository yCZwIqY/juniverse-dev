import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {};
const Input = ({ ...props }: InputProps) => {
  return (
    <span className={'border border-white/10 bg-white/5 rounded-lg px-2 py-1 backdrop-blur-md'}>
      <input
        {...props}
        className={`w-full h-full outline-none border-none bg-transparent text-gray-100 placeholder:text-gray-400 ${props.className}`}
      />
    </span>
  );
};

export default Input;
