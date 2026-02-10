'use client';

import type { ProjectData } from 'apis';
import { useRouter } from 'next/navigation';

interface ProjectTableProps {
  data: ProjectData[];
  onDelete: (id: number) => Promise<unknown>;
}

const ProjectTable = ({ data, onDelete }: ProjectTableProps) => {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-3'>
      {data.map((project) => (
        <div
          onClick={() => router.push(`/projects/${project.id}`)}
          key={project.id}
          className='rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.35)] p-4 text-white'
        >
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='w-full md:w-[160px]'>
              {project.imageUrls?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.imageUrls[0]}
                  alt={`${project.title} thumbnail`}
                  className='h-28 w-full object-cover rounded-xl'
                />
              ) : (
                <div className='h-28 w-full rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-sm text-gray-300'>
                  No Image
                </div>
              )}
            </div>
            <div className='flex-1'>
              <div className='text-sm text-cyan-200/80'>#{project.id}</div>
              <div className='text-lg font-semibold tracking-tight'>{project.title}</div>
              <div className='mt-1 text-sm text-gray-200/80 line-clamp-2'>{project.description ?? '-'}</div>
              <div className='mt-2 flex items-center gap-2 text-xs'>
                <span className='px-2 py-1 rounded-full border border-cyan-300/40 text-cyan-200'>
                  {project.isToy ? 'Toy' : 'Project'}
                </span>
              </div>
            </div>
            <div className='flex flex-col items-start md:items-end gap-2'>
              <div className='flex items-center gap-2'>
                {project.gitHubUrl ? (
                  <a
                    href={project.gitHubUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-cyan-200 border border-cyan-300/50 px-3 py-1 rounded-lg hover:bg-cyan-400/10'
                  >
                    GitHub
                  </a>
                ) : (
                  <span className='text-gray-400'>GitHub -</span>
                )}
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-emerald-200 border border-emerald-300/50 px-3 py-1 rounded-lg hover:bg-emerald-400/10'
                  >
                    Demo
                  </a>
                ) : (
                  <span className='text-gray-400'>Demo -</span>
                )}
              </div>
              <button
                type='button'
                onClick={() => onDelete(project.id)}
                className='text-red-200 border border-red-400/70 px-3 py-1 rounded-lg hover:bg-red-500/20'
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTable;
