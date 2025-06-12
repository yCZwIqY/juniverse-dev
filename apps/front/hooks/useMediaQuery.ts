'use client';
import { useEffect, useState } from 'react';

const useMediaQuery = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (typeof window !== 'undefined') {
        setIsDesktop(!window.matchMedia('(max-width:767px)').matches);
        setIsMobile(window.matchMedia('(max-width:767px)').matches);
      }
    };

    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return { isDesktop, isMobile };
};

export default useMediaQuery;
