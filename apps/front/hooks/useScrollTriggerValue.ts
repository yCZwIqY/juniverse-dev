import { useEffect, useRef, useState } from 'react';

const useScrollTriggerValue = (targetValue: number) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const targetCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(windowHeight / 2 - targetCenter);
      const maxDistance = windowHeight * 0.5;

      let progress = 1 - distanceFromCenter / maxDistance;
      progress = Math.max(0, Math.min(progress, 1));

      setValue(Math.round(progress * targetValue));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { value, targetRef };
};

export default useScrollTriggerValue;
