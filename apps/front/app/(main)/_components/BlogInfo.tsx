import Tag from '@/app/_components/tag/Tag';
import Link from 'next/link';

interface BlogInfoProps {
  lastPostId?: number;
}

const BlogInfo = async ({ lastPostId }: BlogInfoProps) => {
  return (
    <section className={'w-full border border-border p-5 bg-card rounded-xl flex flex-col gap-4'}>
      <div className={'text-3xl font-bold'}>
        코드와 함께하는
        <br />
        개발 여정
      </div>
      <div>프론트엔드부터 백엔드까지, 개발하며 배운 것들을 기록합니다.</div>
      <div className={'flex gap-1 flex-wrap'}>
        <Tag>Frontend</Tag>
        <Tag>Backend</Tag>
        <Tag>React.js</Tag>
        <Tag>Next.js</Tag>
        <Tag>Nest.js</Tag>
        <Tag>React Native</Tag>
        <Tag>Typescript</Tag>
        <Tag>Java</Tag>
        <Tag>Spring boot</Tag>
      </div>
      <div className={'flex gap-[10px]'}>
        {lastPostId && (
          <Link
            href={`/posts/${lastPostId}`}
            prefetch={false}
            className={
              'font-bold border border-primary bg-linear-to-b from-primary/18 to-white/52 p-3 rounded-lg flex items-center justify-center gap-[10px] hover:opacity-70 active:opacity-50'
            }
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 12.6666V3.33331L13.3333 7.99998L4 12.6666Z"
                stroke='var(--color-foreground)'
                strokeOpacity="0.92"
                strokeWidth="1.33333"
                strokeLinejoin="round"
              />
            </svg>
            <span>최근 글 보기</span>
          </Link>
        )}
        {/*<button*/}
        {/*  className={*/}
        {/*    'font-bold border border-border p-3 rounded-lg flex items-center justify-center gap-[10px] hover:opacity-70 active:opacity-50'*/}
        {/*  }*/}
        {/*>*/}
        {/*  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
        {/*    <g opacity="0.55">*/}
        {/*      <path d="M8 1.33331V5.33331" stroke="#0C1223" strokeOpacity="0.7" strokeWidth="1.33333" strokeLinecap="round" />*/}
        {/*      <path d="M8 10.6667V14.6667" stroke="#0C1223" strokeOpacity="0.7" strokeWidth="1.33333" strokeLinecap="round" />*/}
        {/*      <path d="M3.28667 3.28668L6.11333 6.11335" stroke="#0C1223" strokeOpacity="0.7" strokeWidth="1.33333" strokeLinecap="round" />*/}
        {/*      <path d="M9.88667 9.88666L12.7133 12.7133" stroke="#0C1223" strokeOpacity="0.7" strokeWidth="1.33333" strokeLinecap="round" />*/}
        {/*      <path d="M1.33333 8H5.33333" stroke="#0C1223" strokeOpacity="0.7" strokeWidth="1.33333" strokeLinecap="round" />*/}
        {/*      <path d="M10.6667 8H14.6667" stroke="#0C1223" strokeOpacity="0.7" strokeWidth="1.33333" strokeLinecap="round" />*/}
        {/*      <path d="M3.28667 12.7133L6.11333 9.88666" stroke="#0C1223" strokeOpacity="0.7" strokeWidth="1.33333" strokeLinecap="round" />*/}
        {/*      <path d="M9.88667 6.11335L12.7133 3.28668" stroke="#0C1223" strokeOpacity="0.7" strokeWidth="1.33333" strokeLinecap="round" />*/}
        {/*    </g>*/}
        {/*  </svg>*/}
        {/*  <span>시리즈 모아보기</span>*/}
        {/*</button>*/}
      </div>
    </section>
  );
};

export default BlogInfo;
