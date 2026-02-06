const Loading = () => {
  return (
    <div className={'py-4 flex flex-col gap-4'}>
      <section className={'w-full border border-border p-5 bg-card rounded-xl flex flex-col gap-4 min-h-[300px] flex justify-center items-center'}>
        <svg
          className={'animate-spin'}
          width={'64px'}
          height={'64px'}
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
          fill="var(--tt-bg-color)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g fill="none" fillRule="evenodd">
              <circle cx="7" cy="7" r="6" stroke="var(--tt-bg-color)" strokeOpacity=".1" strokeWidth="2"></circle>
              <path fill="var(--tt-bg-color)" fillOpacity=".1" fillRule="nonzero" d="M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z"></path>
            </g>
          </g>
        </svg>
      </section>
    </div>
  );
};

export default Loading;
