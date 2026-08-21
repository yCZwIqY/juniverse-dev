import ProjectScreenshotItem from '@/app/(main)/projects/[id]/_components/ProjectScreenshotItem';

interface ProjectScreenshotsProps {
  imageUrls?: string[];
  title: string;
}

const ProjectScreenshots = ({ imageUrls = [], title }: ProjectScreenshotsProps) => {
  return (
    <section className="flex flex-col gap-2.5">
      <div className="eyebrow">Screenshots</div>
      {imageUrls.length === 0 ? (
        <div className="border border-[var(--color-hairline)] rounded-[var(--radius-lg)] bg-[var(--color-canvas)] py-12 text-center text-sm text-[var(--color-mute)]">
          등록된 스크린샷이 없습니다
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {imageUrls.map((url, index) => (
            <ProjectScreenshotItem
              key={`${url}-${index}`}
              imageUrl={url}
              alt={`${title} 스크린샷 ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectScreenshots;
