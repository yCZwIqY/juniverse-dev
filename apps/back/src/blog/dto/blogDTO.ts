import { Upload } from '../../upload/upload.entity';
import { CommentDTO } from './CommentDTO';

export class BaseBlogDTO {
  id?: number;
  title: string;
  subtitle: string;
  contents: string;
  createdAt: Date;
  views: number;
  likes: string[];

  constructor(
    id: number,
    title: string,
    subtitle: string,
    contents: string,
    createdAt: Date,
    views: number,
    likes: string[],
  ) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.contents = contents;
    this.createdAt = createdAt;
    this.views = views;
    this.likes = likes;
  }
}

export class BlogDTO extends BaseBlogDTO {
  thumbnail?: Upload;
  techs?: string[];
  comments?: CommentDTO[];
}
