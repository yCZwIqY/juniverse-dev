import React from 'react';

const Loading = () => {
  return <div className={'py-4 flex flex-col gap-4'}>
    <section className={'w-full flex flex-col gap-4 min-h-dvh justify-center items-center backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]'}>
      <svg
        className={'animate-spin'}
        width={'64px'}
        height={'64px'}
        viewBox='0 0 14 14'
        xmlns='http://www.w3.org/2000/svg'
        fill='rgba(255,255,255,0.9)'
      >
        <g id='SVGRepo_bgCarrier'
           strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier'
           strokeLinecap='round'
           strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          <g fill='none'
             fillRule='evenodd'>
            <circle cx='7'
                    cy='7'
                    r='6'
                    stroke='rgba(255,255,255,0.15)'
                    strokeWidth='2'></circle>
            <path fill='rgba(255,255,255,0.9)'
                  fillOpacity='.2'
                  fillRule='nonzero'
                  d='M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z'></path>
          </g>
        </g>
      </svg>
    </section>
  </div>;
};

export default Loading;