const ContactSection = () => {
  return (
    <section className="color-block-section w-full flex flex-col gap-5 reveal">
      <div>
        <div className="eyebrow mb-2">Contact</div>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-ink)]">같이 이야기해요</h2>
        <p className="text-sm text-[var(--muted-foreground)] mt-2">
          프로젝트/협업 문의는 아래로 연락 주세요.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <a className="contact-pill text-sm" href="mailto:ljy10499@gmail.com">
          ljy10499@gmail.com
        </a>
        <a className="contact-pill text-sm" href="https://github.com/yCZwIqY" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
