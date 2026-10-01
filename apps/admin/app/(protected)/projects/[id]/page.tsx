import { getProject } from 'apis/server';
import ProjectForm from './_component/ProjectForm';

interface Props {
  params: Promise<{ id: string }>;
}

const ProjectDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const isNew = id === '0';

  const projectRes = isNew ? null : await getProject(id);

  return <ProjectForm initialProject={projectRes?.data ?? null} id={id} isNew={isNew} />;
};

export default ProjectDetailPage;
