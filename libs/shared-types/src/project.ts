import { Tech } from './tech';
import { FileData } from './common';

export interface Project {
  id: string;
  title: string;
  video?: FileData;
  images?: FileData[];
  startDate: Date;
  endDate: Date;
  techs: Tech[];
  summary: string;
  description: string;
  memberCount: number;
  githubUrl: string;
  demoUrl: string;
  role: string;
}
