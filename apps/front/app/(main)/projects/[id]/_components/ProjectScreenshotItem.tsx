import Image from 'next/image';

interface ProjectScreenshotItemProps {
  imageUrl: string;
  alt: string;
}

const ProjectScreenshotItem = ({ imageUrl, alt }: ProjectScreenshotItemProps) => {
  return (
    <a href={imageUrl} target={'_blank'} rel={'noreferrer'} className={'block rounded-lg overflow-hidden border border-border bg-card'}>
      <Image
        src={imageUrl}
        alt={alt}
        width={1400}
        height={900}
        className={'w-full h-auto min-h-[220px] object-cover transition-transform duration-200 hover:scale-[1.02]'}
      />
    </a>
  );
};

export default ProjectScreenshotItem;
