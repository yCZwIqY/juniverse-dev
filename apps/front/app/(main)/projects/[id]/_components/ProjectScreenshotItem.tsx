import Image from 'next/image';

interface ProjectScreenshotItemProps {
  imageUrl: string;
  alt: string;
}

const ProjectScreenshotItem = ({ imageUrl, alt }: ProjectScreenshotItemProps) => {
  return (
    <a
      href={imageUrl}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-canvas-soft)] hover:border-[var(--color-primary)] transition-colors duration-150"
    >
      <Image
        src={imageUrl}
        alt={alt}
        width={1400}
        height={900}
        className="w-full h-auto min-h-[200px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </a>
  );
};

export default ProjectScreenshotItem;
