import React from 'react';

interface RadioProps {
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (value: string) => void;
}

const Radio = ({ value, onChange, options }: RadioProps) => {
  return (
    <div>
      {options.map((option) => (
        <div key={option.value} className={'flex items-center gap-5'}>
          <div onClick={() => onChange(option.value === value ? '' : option.value)}>
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d={`${option.value === value ? 'M17 9L9.99998 16L6.99994 13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z' : 'M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'}`}
                stroke={`${option.value === value ? 'white' : '#4DBBFF'}`}
                fill={`${option.value === value ? '#4DBBFF' : 'white'}`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={'text-lg text-primary font-semibold uppercase'}>{option.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Radio;
