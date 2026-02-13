const PageNotFound = () => {
  return (
    <div className={'py-8'}>
      <div className={'border border-border rounded-lg p-6 bg-card flex flex-col gap-2'}>
        <h1 className={'text-xl lg:text-2xl font-bold'}>프로젝트를 찾을 수 없습니다.</h1>
        <p className={'text-gray-500'}>요청한 프로젝트가 삭제되었거나 잘못된 경로입니다.</p>
      </div>
    </div>
  );
};

export default PageNotFound;
