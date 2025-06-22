import { FileData } from './common';

export interface Project {
  id: string;
  title: string;
  thumbnail?: FileData | null;
  video?: FileData | null;
  images?: FileData[];
  startDate: Date;
  endDate: Date;
  techs: string[];
  summary: string;
  description: string;
  memberCount: number;
  githubUrl: string;
  demoUrl: string;
  role: string;
}
