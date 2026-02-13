import ProjectScreenshotItem from '@/app/(main)/projects/[id]/_components/ProjectScreenshotItem';

interface ProjectScreenshotsProps {
  imageUrls?: string[];
  title: string;
}

const ProjectScreenshots = ({ imageUrls = [], title }: ProjectScreenshotsProps) => {
  if (imageUrls.length === 0) {
    return (
      <section className={'flex flex-col gap-3'}>
        <h2 className={'text-xl lg:text-2xl font-bold'}>Screenshots</h2>
        <div className={'rounded-lg border border-border bg-card p-10 text-center text-gray-500'}>등록된 스크린샷이 없습니다.</div>
      </section>
    );
  }

  return (
    <section className={'flex flex-col gap-3'}>
      <h2 className={'text-xl lg:text-2xl font-bold'}>Screenshots</h2>
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-3'}>
        {imageUrls.map((imageUrl, index) => (
          <ProjectScreenshotItem key={`${imageUrl}-${index}`} imageUrl={imageUrl} alt={`${title} 스크린샷 ${index + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default ProjectScreenshots;
