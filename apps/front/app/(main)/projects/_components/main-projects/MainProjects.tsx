"use client";

import { CSSProperties, useEffect, useState } from 'react';
import { ProjectData } from 'apis';
import MainProjectItem from '@/app/(main)/projects/_components/main-projects/MainProjectItem';

interface MainProjectsProps {
  projects: ProjectData[];
}

const getCircularOffset = (index: number, currentIndex: number, total: number) => {
  if (total <= 1) {
    return 0;
  }

  const rawOffset = index - currentIndex;
  const half = Math.floor(total / 2);

  if (rawOffset > half) {
    return rawOffset - total;
  }

  if (rawOffset < -half) {
    return rawOffset + total;
  }

  return rawOffset;
};

const MainProjects = ({ projects }: MainProjectsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (projects.length === 0) {
      return;
    }

    setCurrentIndex((prev) => prev % projects.length);
  }, [projects.length]);

  useEffect(() => {
    if (projects.length <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 12000);

    return () => {
      clearInterval(intervalId);
    };
  }, [projects.length]);

  const slideStyles = projects.map((_, index) => {
    const offset = getCircularOffset(index, currentIndex, projects.length);
    const distance = Math.abs(offset);
    const isVisible = distance <= 2 || projects.length <= 3;

    const style: CSSProperties = {
      transform: `translateX(${offset * 22}%) translateZ(${-distance * 180}px) rotateY(${offset * -24}deg) scale(${1 - distance * 0.08})`,
      transformOrigin: 'center center',
      opacity: distance === 0 ? 1 : distance === 1 ? 0.65 : 0.35,
      zIndex: projects.length - distance,
      pointerEvents: distance === 0 ? 'auto' : 'none',
      transition: 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease',
      visibility: isVisible ? 'visible' : 'hidden',
    };

    return style;
  });

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className={'w-full'}>
      <div className={'relative h-[560px] w-full lg:h-[440px]'} style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={'absolute inset-0 mx-auto w-full max-w-[1050px]'}
            style={slideStyles[index]}
            aria-hidden={index !== currentIndex}
          >
            <MainProjectItem project={project} />
          </div>
        ))}
      </div>

      {projects.length > 1 && (
        <div className={'mt-4 flex items-center justify-center gap-2'}>
          {projects.map((project, index) => (
            <button
              key={project.id}
              type={'button'}
              aria-label={`${index + 1}번째 프로젝트 보기`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                currentIndex === index ? 'bg-zinc-900' : 'bg-zinc-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainProjects;
