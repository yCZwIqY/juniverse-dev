import type { BaseResponse } from './common';

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  position: string;
  contribution: string;
  content: string;
  startDate?: string;
  endDate?: string;
  tags: string[];
  gitHubUrl: string;
  demoUrl: string;
  imageUrls: string[];
  isToy: boolean;
  sourceCode?: Record<string, string>;
}

export type ProjectsResponse = BaseResponse<ProjectData[]>;
export type ProjectResponse = BaseResponse<ProjectData>;

export type ProjectFormData = {
  title: string;
  description: string;
  position: string;
  contribution: string;
  content: string;
  startDate: string;
  endDate: string;
  tags: string[];
  gitHubUrl?: string;
  demoUrl?: string;
  images?: File[];
  imageUrls?: string[];
  isToy: boolean;
  sourceCode?: Record<string, string>;
};
