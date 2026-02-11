'use client';
import { MenuData } from 'apis';
import Button from '@/app/_components/common/Button';
import { useMenuStore } from '@/app/menus/_store';

const MenuItem = (data: MenuData) => {
  const { select, add, selectedMenu } = useMenuStore();
  const { name, children } = data;
  return (
    <>
      <div className={'my-[2px]'}>
        <div className={'flex gap-1 items-center'}>
          <button
            type={'button'}
            className={`p-3 rounded-md w-full text-left border transition-colors border-white/10 bg-white/5 text-gray-100 hover:bg-white/15 hover:text-white ${
              selectedMenu?.id === data.id ? 'bg-cyan-400/20 border-cyan-300/40 text-white' : ''
            }`}
            onClick={() => select(data)}
          >
            {name}
          </button>
          <Button className={'aspect-square rounded-md h-full p-1'} onClick={() => add(data)}>
            <svg fill='#FFFFFF'
                 version='1.1'
                 id='Capa_1'
                 xmlns='http://www.w3.org/2000/svg'
                 width='20px'
                 height='20px'
                 viewBox='0 0 45.402 45.402'>
              <g id='SVGRepo_bgCarrier'
                 strokeWidth='0'></g>
              <g id='SVGRepo_tracerCarrier'
                 strokeLinecap='round'
                 strokeLinejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <g>
                  <path d='M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z'></path>
                </g>
              </g>
            </svg>
          </Button>
        </div>
      </div>
      {children && (
        <div className={'pl-8'}>
          {children
            .sort((a, b) => a.seqNo - b.seqNo)
            .map((child: MenuData) => (
              <MenuItem key={child.id} {...child} />
            ))}
        </div>
      )}
    </>
  );
};

export default MenuItem;
