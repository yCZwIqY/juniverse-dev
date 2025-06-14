import React from 'react';

interface AboutMeLabelTextProps {
  label: string;
  value: string;
}

const AboutMeLabelText = ({ label, value }: AboutMeLabelTextProps) => {
  return (
    <div className={'flex flex-col'}>
      <div className={'text-primary-dark text-sm font-bold'}>{label}</div>
      <div className={'text-lg'}>{value}</div>
    </div>
  );
};

export default AboutMeLabelText;
