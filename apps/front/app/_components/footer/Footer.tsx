import Link from 'next/link';

const Footer = () => {
  return (
    <div className={'w-full my-5 py-3 px-5 flex items-center justify-between border border-border rounded-xl bg-card z-10'}>
      <span>© 2026 Juniverse Dev</span>
      <span>
        <Link href={'/posts'} className={'hover:underline'}>
          Posts
        </Link>
      </span>
    </div>
  );
};

export default Footer;
