import { notFound } from 'next/navigation';
import { getProject } from 'apis';
import ProjectTitle from '@/app/(main)/projects/[id]/_components/ProjectTitle';
import ProjectMetaData from '@/app/(main)/projects/[id]/_components/ProjectMetaData';
import ProjectScreenshots from '@/app/(main)/projects/[id]/_components/ProjectScreenshots';
import ProjectContent from '@/app/(main)/projects/[id]/_components/ProjectContent';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  return {
    title: project?.data?.title ? `Project: ${project?.data?.title}` : 'Project',
    description: project?.data?.description,
    keywords: project?.data?.tags,
  };
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { id } = await params;
  if (!id) notFound();
  const projectResponse = await getProject(id);
  const project = projectResponse?.data;
  if (!project) notFound();

  return (
    <div className={'py-4 flex flex-col gap-4 relative'}>
      <div className={'glass-card p-6 lg:p-8 mt-4 flex flex-col gap-8'}>
        <ProjectTitle project={project} />
        <ProjectMetaData project={project} />
        <ProjectScreenshots imageUrls={project.imageUrls} title={project.title} />
        <ProjectContent content={project.content} />
      </div>
    </div>
  );
};

export default ProjectPage;
