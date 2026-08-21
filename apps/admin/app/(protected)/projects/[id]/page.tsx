'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useController, useForm } from 'react-hook-form';

import { getProject, ProjectFormData } from 'apis';
import { createProject, updateProject } from '@/app/(protected)/_libs/projects';
import { Button, Checkbox, Label } from 'components';
import ContentEditor from '@/app/(protected)/_components/form/ContentEditor';
import ImageFileInput from '@/app/(protected)/_components/form/ImageFileInput';
import TagInput from '@/app/(protected)/_components/form/TagInput';
import TextInput from '@/app/(protected)/_components/form/TextInput';

const DEFAULT_CONTENT =
  '<h1>프로젝트 소개</h1><p>이 프로젝트는 어떤 문제를 해결하기 위해 시작되었으며, 어떤 사용자에게 어떤 가치를 제공하는지 설명합니다.</p><h2>기획 배경 및 목적</h2><p>프로젝트를 시작하게 된 계기와 기존 방식의 문제점, 이를 어떻게 개선하고자 했는지를 작성합니다.</p><h2>주요 기능</h2><ul><li>핵심 기능 1</li><li>핵심 기능 2</li></ul><h2>기술 스택</h2><ul><li>Frontend: React / Next.js</li><li>Backend: NestJS</li></ul><h2>담당 역할 및 기여도</h2><p>본인이 기여한 부분을 중심으로 작성합니다.</p><h2>소스 코드</h2>';

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
      content: DEFAULT_CONTENT,
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
  } = useController({ name: 'isToy', control: form.control });

  useEffect(() => {
    if (isNew || !id) return;
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
    const payload: ProjectFormData = { ...data, imageUrls: existingImages };
    if (isNew) await createProject(payload);
    else if (id) await updateProject(id.toString(), payload);
    router.push('/projects');
  };

  return (
    <div className="max-w-[1100px] mx-auto w-full">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex items-center justify-between sticky -top-6 py-2 bg-[var(--color-canvas)] z-10 border-b border-[var(--color-hairline)]">
            <div>
              <div className="eyebrow mb-0.5">{isNew ? 'New Project' : 'Edit Project'}</div>
              <div className="text-xl font-bold text-[var(--color-ink)]">{isNew ? '작성' : '수정'}</div>
            </div>
            <Button variant="default" size="md" type="submit">작성완료</Button>
          </div>

          <div className="glass-card p-6 flex flex-col gap-4">
            <TextInput name="title" label="제목" maxLength={200} />
            <TextInput name="description" label="디스크립션" maxLength={500} />
            <TextInput name="position" label="포지션" maxLength={200} />
            <TextInput name="contribution" label="기여도" maxLength={200} />
            <TextInput name="startDate" label="시작일" maxLength={30} />
            <TextInput name="endDate" label="종료일" maxLength={30} />
            <TextInput name="gitHubUrl" label="GitHub URL" maxLength={500} />
            <TextInput name="demoUrl" label="Demo URL" maxLength={500} />

            <div className="flex items-center gap-3">
              <Checkbox
                id="isToy"
                checked={Boolean(isToyValue)}
                onCheckedChange={(checked) => onIsToyChange(Boolean(checked))}
              />
              <Label htmlFor="isToy">토이 프로젝트</Label>
            </div>

            {existingImages.length > 0 && (
              <div className="flex flex-col gap-2">
                <Label>기존 이미지</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {existingImages.map((url, index) => (
                    <div key={url} className="border border-[var(--color-hairline)] rounded-[var(--radius-sm)] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="existing" className="w-full h-28 object-cover" />
                      <div className="p-2 flex items-center justify-between gap-1">
                        <div className="text-xs text-[var(--muted-foreground)] truncate">{url}</div>
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => setExistingImages((prev) => {
                              if (index === 0) return prev;
                              const next = [...prev];
                              const [item] = next.splice(index, 1);
                              next.splice(index - 1, 0, item);
                              return next;
                            })}
                          >↑</Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => setExistingImages((prev) => {
                              if (index === prev.length - 1) return prev;
                              const next = [...prev];
                              const [item] = next.splice(index, 1);
                              next.splice(index + 1, 0, item);
                              return next;
                            })}
                          >↓</Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => setExistingImages((prev) => prev.filter((_, i) => i !== index))}
                          >✕</Button>
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
