const LoadingPage = () => {
  return (
    <div className={'py-4 flex flex-col gap-6'}>
      <section className={'w-full min-h-[70svh] md:min-h-[80svh] glass-card p-8'} />

      <section className={'glass-card w-full p-4 lg:p-8 flex flex-col gap-4'}>
        <div className={'h-8 w-44 rounded-md bg-secondary'} />
        <div className={'grid gap-4 md:grid-cols-2'}>
          <div className={'h-44 rounded-xl bg-secondary'} />
          <div className={'h-44 rounded-xl bg-secondary'} />
          <div className={'h-44 rounded-xl bg-secondary'} />
          <div className={'h-44 rounded-xl bg-secondary'} />
        </div>
      </section>

      <div className={'flex flex-col lg:grid grid-cols-[2fr_1fr] gap-2 my-5'}>
        <div className={'h-10 w-32 rounded-md bg-secondary col-span-2'} />
        <section className={'glass-card w-full p-4 lg:p-8 flex flex-col gap-3'}>
          <div className={'h-8 w-40 rounded-md bg-secondary'} />
          <div className={'h-16 rounded-full bg-secondary'} />
          <div className={'h-16 rounded-full bg-secondary'} />
          <div className={'h-16 rounded-full bg-secondary'} />
        </section>
        <section className={'glass-card w-full p-4 lg:p-8 flex flex-col gap-3'}>
          <div className={'h-8 w-36 rounded-md bg-secondary'} />
          <div className={'flex flex-wrap gap-2'}>
            <div className={'h-8 w-20 rounded-full bg-secondary'} />
            <div className={'h-8 w-24 rounded-full bg-secondary'} />
            <div className={'h-8 w-16 rounded-full bg-secondary'} />
            <div className={'h-8 w-28 rounded-full bg-secondary'} />
          </div>
        </section>
      </div>

      <section className={'w-full border-t border-border py-10 flex flex-col gap-4'}>
        <div className={'h-10 w-28 rounded-md bg-secondary'} />
        <div className={'h-5 w-80 max-w-full rounded-md bg-secondary'} />
        <div className={'flex flex-col md:flex-row gap-3'}>
          <div className={'h-12 w-52 rounded-full bg-secondary'} />
          <div className={'h-12 w-32 rounded-full bg-secondary'} />
        </div>
      </section>
    </div>
  );
};

export default LoadingPage;
