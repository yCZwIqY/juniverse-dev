'use client';

import { Project } from 'shared-types';
import Image from 'next/image';
import Tag from '@/app/_components/common/Tag';
import { format } from 'date-fns';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';

interface ProjectItemProps {
  project: Project;
  index: number;
}

const ProjectItem = ({ project, index }: ProjectItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isDesktop } = useMediaQuery();

  return (
    <div ref={ref} className={'h-screen w-full md:h-auto flex justify-center items-center'} style={{ scrollSnapAlign: 'start' }}>
      <motion.div
        className={
          'h-[90dvh] w-full rounded-md lg:rounded-none lg:h-52 flex flex-col bg-white justify-between gap-3 lg:flex-row lg:bg-transparent perspective origin-top'
        }
        initial={{ y: 140, opacity: 0 }}
        animate={
          isInView
            ? {
                y: 0,
                rotateX: 0,
                opacity: 1,
                transition: {
                  delay: (isDesktop ? index : 0) * 0.5,
                  duration: 0.6,
                  ease: 'easeOut',
                },
              }
            : {}
        }
      >
        <div className={'flex flex-col lg:flex-row gap-3 lg:flex-1 h-full bg-white rounded-md lg:rounded-none p-4 justify-between'}>
          <div className={'flex flex-col lg:flex-row gap-3 '}>
            <div className={'mx-4 flex justify-center items-center'}>
              {project.thumbnail ? (
                <Image className={'w-32 h-32'} src={project.thumbnail.src} alt={project.title} width={100} height={100} />
              ) : (
                <div></div>
              )}
            </div>
            <div className={'flex flex-col justify-between'}>
              <div className={'p-3'}>
                <div className={'text-2xl font-semibold'}>{project.title}</div>
                <div className={' text-sm text-gray-dark'}>{project.summary}</div>
              </div>
              <div className={'w-full flex flex-wrap gap-1 justify-center lg:justify-start'}>
                {project.techs.map((tech: string) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </div>
          <div className={'flex flex-col justify-center mx-10'}>
            <div className={'flex gap-10 text-center justify-between'}>
              <div className={'flex flex-col'}>
                <div className={'text-gray-dark font-bold'}>Start Date</div>
                <div className={'text-lg'}>{format(project.startDate, 'yyyy.MM.dd')}</div>
              </div>
              <div className={'flex flex-col'}>
                <div className={'text-gray-dark font-bold'}>End Date</div>
                <div className={'text-lg'}>{format(project.endDate, 'yyyy.MM.dd')}</div>
              </div>
            </div>
            <div className={'flex items-center -gap-[2px] px-9'}>
              <div className={'border w-5 h-5 rounded-full'} />
              <div className={'flex-1 w-full h-[1px] bg-black'} />
              <div className={'border w-5 h-5 rounded-full'} />
            </div>
            <div className={'flex justify-center mt-4'}>
              <button className={'bg-primary text-white font-semibold px-8 py-2 rounded-md hover:bg-primary-dark'}>상세보기</button>
            </div>
          </div>
        </div>
        <div className={'m-6 lg:m-0 h-96 lg:w-52 lg:h-full bg-primary-light flex flex-col justify-between rounded-lg p-4'}>
          <div className={'p-2'}>
            <table className={'w-full text-white'}>
              <colgroup>
                <col className={'w-[50%] my-2 '} />
                <col className={'w-[50%] my-2 font-bold text-sm'} />
              </colgroup>
              <tbody>
                <tr>
                  <td className={'flex'}>인원</td>
                  <td>{project.memberCount}</td>
                </tr>
                <tr>
                  <td className={'flex'}>포지션</td>
                  <td>{project.role}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={'flex flex-col gap-1 my-3'}>
            <Link
              href={project.githubUrl}
              className={
                'bg-primary text-white font-semibold w-full flex justify-between items-center px-6 py-3 md:py-1 rounded-full hover:bg-primary-dark'
              }
            >
              <div>Github</div>
              <div>
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
            {project.demoUrl && (
              <Link
                href={project.demoUrl ?? ''}
                className={
                  'text-primary bg-white font-semibold w-full flex justify-between items-center px-6 py-3 md:py-1 rounded-full hover:bg-gray'
                }
              >
                <div>Demo</div>
                <div>
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19"
                      stroke="#4DBBFF"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectItem;
