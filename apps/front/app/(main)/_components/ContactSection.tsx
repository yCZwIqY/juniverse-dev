const ContactSection = () => {
  return (
    <section className={'contact-section w-full reveal'}>
      <div className={'text-2xl md:text-3xl font-bold'}>Contact</div>
      <div className={'text-sm text-muted-foreground'}>
        프로젝트/협업 문의는 아래로 연락 주세요.
      </div>
      <div className={'flex flex-col md:flex-row gap-3'}>
        <a className={'contact-pill'} href={'mailto:ljy10499@gmail.com'}>
          ljy10499@gmail.com
        </a>
        <a className={'contact-pill'} href={'https://github.com/yCZwIqY'} target={'_blank'} rel={'noreferrer'}>
          GitHub
        </a>
        {/*<a className={'contact-pill'} href={'https://www.linkedin.com/'} target={'_blank'} rel={'noreferrer'}>*/}
        {/*  LinkedIn*/}
        {/*</a>*/}
      </div>
    </section>
  );
};

export default ContactSection;
