'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import TextInput from '@/app/(protected)/_components/form/TextInput';
import ContentEditor from '@/app/(protected)/_components/form/ContentEditor';
import TagInput from '@/app/(protected)/_components/form/TagInput';
import ImageFileInput from '@/app/(protected)/_components/form/ImageFileInput';
import Button from '@/app/(protected)/_components/common/Button';
import { createProject, getProject, ProjectFormData, updateProject } from 'apis';

const ProjectDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const isNew = id === '0';
  const router = useRouter();

  const form = useForm<ProjectFormData>({
    defaultValues: {
      title: '',
      description: '',
      position: '',
      contribution: '',
      content: '<h1>프로젝트 소개</h1>\n' +
        '<p>\n' +
        '  이 프로젝트는 어떤 문제를 해결하기 위해 시작되었으며,\n' +
        '  어떤 사용자에게 어떤 가치를 제공하는지 설명합니다.\n' +
        '</p>\n' +
        '\n' +
        '<h2>기획 배경 및 목적</h2>\n' +
        '<p>\n' +
        '  프로젝트를 시작하게 된 계기와\n' +
        '  기존 방식의 문제점, 이를 어떻게 개선하고자 했는지를 작성합니다.\n' +
        '</p>\n' +
        '\n' +
        '<h2>주요 기능</h2>\n' +
        '<ul>\n' +
        '  <li>핵심 기능 1</li>\n' +
        '  <li>핵심 기능 2</li>\n' +
        '  <li>핵심 기능 3</li>\n' +
        '</ul>\n' +
        '\n' +
        '<h2>기술 스택</h2>\n' +
        '<ul>\n' +
        '  <li>Frontend: React / Next.js / TypeScript</li>\n' +
        '  <li>Backend: NestJS / Node.js</li>\n' +
        '  <li>Database: PostgreSQL / Redis</li>\n' +
        '  <li>Infra: Docker / Nginx / AWS</li>\n' +
        '</ul>\n' +
        '\n' +
        '<h2>담당 역할 및 기여도</h2>\n' +
        '<p>\n' +
        '  개인 프로젝트의 경우 전체 구조 설계부터 개발, 배포까지 담당한 내용을,\n' +
        '  팀 프로젝트의 경우 본인이 기여한 부분을 중심으로 작성합니다.\n' +
        '</p>\n' +
        '\n' +
        '<h2>문제 해결 및 기술적 고민</h2>\n' +
        '<ul>\n' +
        '  <li>\n' +
        '    <strong>문제</strong> – 발생한 이슈 또는 기술적 한계<br />\n' +
        '    <strong>원인</strong> – 문제의 근본 원인 분석<br />\n' +
        '    <strong>해결</strong> – 적용한 해결 방법과 선택 이유<br />\n' +
        '    <strong>결과</strong> – 개선된 점과 얻은 인사이트\n' +
        '  </li>\n' +
        '</ul>\n' +
        '\n' +
        '<h2>아쉬운 점 및 개선 방향</h2>\n' +
        '<p>\n' +
        '  시간, 기술적 제약 등으로 구현하지 못한 부분과\n' +
        '  추후 개선하고 싶은 방향을 정리합니다.\n' +
        '</p>\n' +
        '\n' +
        '<h2>소스 코드</h2>\n',
      startDate: '',
      endDate: '',
      tags: [],
      gitHubUrl: '',
      demoUrl: '',
      images: [],
      isToy: false,
      sourceCode: {},
    },
  });
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const {
    field: { value: isToyValue, onChange: onIsToyChange },
  } = useController({
    name: 'isToy',
    control: form.control,
  });

  useEffect(() => {
    if (isNew) return;
    if (!id) return;
    getProject(id.toString()).then((res) => {
      if (!res?.data) return;
      const project = res.data;
      form.reset({
        title: project.title ?? '',
        description: project.description ?? '',
        position: project.position ?? '',
        contribution: project.contribution ?? '',
        content: project.content ?? '',
        startDate: project.startDate ?? '',
        endDate: project.endDate ?? '',
        tags: project.tags ?? [],
        gitHubUrl: project.gitHubUrl ?? '',
        demoUrl: project.demoUrl ?? '',
        images: [],
        isToy: project.isToy ?? false,
        sourceCode: project.sourceCode ?? {},
      });
      setExistingImages(project.imageUrls ?? []);
    });
  }, [form, id, isNew]);

  const onSubmit = async (data: ProjectFormData) => {
    const payload: ProjectFormData = {
      ...data,
      imageUrls: existingImages,
    };
    if (isNew) {
      await createProject(payload);
    } else if (id) {
      await updateProject(id.toString(), payload);
    }
    router.push('/projects');
  };

  return (
    <div className="max-w-[1100px] mx-auto w-full">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={'text-xl font-bold flex justify-between items-center text-white'}>
            <span>{isNew ? '작성' : '수정'}</span>
            <Button className={'px-4 py-2 rounded-lg bg-cyan-500/80 hover:bg-cyan-400 border border-cyan-300/50'} type={'submit'}>
              작성완료
            </Button>
          </div>
          <div className={'mt-6 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-4 md:p-8 flex flex-col gap-4'}>
            <TextInput name={'title'} label={'제목'} maxLength={200} />
            <TextInput name={'description'} label={'디스크립션'} maxLength={500} />
            <TextInput name={'position'} label={'포지션'} maxLength={200} />
            <TextInput name={'contribution'} label={'기여도'} maxLength={200} />
            <TextInput name={'startDate'} label={'시작일'} maxLength={30} />
            <TextInput name={'endDate'} label={'종료일'} maxLength={30} />
            <TextInput name={'gitHubUrl'} label={'GitHub URL'} maxLength={500} />
            <TextInput name={'demoUrl'} label={'Demo URL'} maxLength={500} />
            <div className={'grid grid-cols-[120px_1fr] gap-4'}>
              <label className={'font-bold text-lg block pb-2 text-center border-b-2 border-white/20 text-gray-200'}>
                토이 프로젝트
              </label>
              <div className={'flex items-center gap-3 text-white'}>
                <input
                  type="checkbox"
                  checked={Boolean(isToyValue)}
                  onChange={(e) => onIsToyChange(e.target.checked)}
                  className="glass-checkbox"
                />
                <span>{isToyValue ? 'Y' : 'N'}</span>
              </div>
            </div>
            {existingImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4">
                <div className="font-bold text-base md:text-lg block pb-2 text-left md:text-center border-b border-white/20 text-gray-200">
                  기존 이미지
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {existingImages.map((url, index) => (
                    <div key={url} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="existing" className="w-full h-28 object-cover" />
                      <div className="p-2 flex items-center justify-between gap-2">
                        <div className="text-xs text-gray-300 truncate" title={url}>
                          {url}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setExistingImages((prev) => {
                                if (index === 0) return prev;
                                const next = [...prev];
                                const [item] = next.splice(index, 1);
                                next.splice(index - 1, 0, item);
                                return next;
                              })
                            }
                            className="text-gray-200 border border-white/20 px-2 py-0.5 rounded-md hover:bg-white/10"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setExistingImages((prev) => {
                                if (index === prev.length - 1) return prev;
                                const next = [...prev];
                                const [item] = next.splice(index, 1);
                                next.splice(index + 1, 0, item);
                                return next;
                              })
                            }
                            className="text-gray-200 border border-white/20 px-2 py-0.5 rounded-md hover:bg-white/10"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => setExistingImages((prev) => prev.filter((_, i) => i !== index))}
                            className="text-red-200 border border-red-400/70 px-2 py-0.5 rounded-md hover:bg-red-500/20"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <ImageFileInput />
            <ContentEditor />
            <TagInput />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProjectDetailPage;
