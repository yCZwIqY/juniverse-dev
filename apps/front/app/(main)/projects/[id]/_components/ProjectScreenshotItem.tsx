import Image from 'next/image';
// https://bucket-2w6800.s3.ap-northeast-2.amazonaws.com/refs/project/3/42876c30-dd3e-4445-af7f-30ac1ff69a74.png
// https://bucket-2w6800.s3.ap-northeast-2.amazonaws.com/refs/project/3/9db4c044-31ab-47d7-bfd7-5a84ad54850b.png
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
