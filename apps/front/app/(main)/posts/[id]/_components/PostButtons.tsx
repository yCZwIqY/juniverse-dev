'use client';
import { useRouter } from 'next/navigation';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

interface PostButtonsProps {
  title: string;
  subtitle: string;
}

const PostButtons = ({ title, subtitle }: PostButtonsProps) => {
  const router = useRouter();
  const { startNavigation } = useNavigationLoading();

  const onShare = () => {
    navigator.share({
      title: title,
      text: subtitle,
      url: window.location.href,
    });
  };

  return (
    <div className={'flex lg:justify-start justify-center gap-2 py-2'}>
      <button
        className={'flex items-center justify-center gap-2 font-bold border-border rounded-sm border px-3 py-1'}
        onClick={() => {
          startNavigation();
          router.push('/posts');
        }}
      >
        <svg fill="var(--tt-theme-text)" width="18px" height="18px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z"></path>
          </g>
        </svg>
        <span>목록 페이지로</span>
      </button>
      <button className={'flex items-center justify-center gap-2 font-bold rounded-sm px-3 py-1 bg-accent text-white'} onClick={onShare}>
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Communication / Share_Android">
              <path
                id="Vector"
                d="M9 13.5L15 16.5M15 7.5L9 10.5M18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21ZM6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12C9 13.6569 7.65685 15 6 15ZM18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{' '}
            </g>{' '}
          </g>
        </svg>
        <span>공유하기</span>
      </button>
    </div>
  );
};

export default PostButtons;
