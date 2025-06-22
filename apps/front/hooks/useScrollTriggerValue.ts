import { useEffect, useRef, useState } from 'react';

const useScrollTriggerValue = (targetValue: number, scrollContainer?: HTMLElement | null) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current || !scrollContainer) return;

      const targetRect = targetRef.current.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();

      const targetCenter = targetRect.top + targetRect.height / 2 - containerRect.top;
      const containerHeight = containerRect.height;

      const distanceFromCenter = Math.abs(containerHeight / 2 - targetCenter);
      const maxDistance = containerHeight / 2;

      let progress = 1 - distanceFromCenter / maxDistance;
      progress = Math.max(0, Math.min(progress, 1));

      setValue(Math.round(progress * targetValue));
    };

    scrollContainer?.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainer]);

  return { value, targetRef };
};

export default useScrollTriggerValue;
