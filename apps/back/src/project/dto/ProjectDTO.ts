import { UploadDTO } from '../../upload/dto/UploadDTO';

export class ProjectDTO {
  id?: number;
  title: string;
  images?: UploadDTO[];
  video?: UploadDTO;
  thumbnail: UploadDTO;
  startDate: Date;
  endDate?: Date;
  techs?: string[];
  summary?: string;
  description?: string;
  memberCount?: number;
  gitHubUrl?: string;
  demoUrl?: string;
  role?: string;

  constructor(
    id: number,
    title: string,
    thumbnail: UploadDTO,
    startDate: Date,
  ) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.startDate = startDate;
  }
}
