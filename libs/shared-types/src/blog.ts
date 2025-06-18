import { FileData } from './common';

export interface Comments {
  id?: string;
  nickname?: string;
  password: string;
  comment: string;
}

export interface Blog {
  id?: string;
  title: string;
  subtitle?: string;
  contents: string;
  thumbnail: FileData;
  createdAt: string;
  views: number;
  likes: string[];
  comments: Comments[];
  techs: string[];
}
