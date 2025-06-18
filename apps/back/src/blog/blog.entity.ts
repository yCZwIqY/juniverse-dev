import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tech } from '../tech/tech.entity';
import { Comment } from './comment.entity';
import { Upload } from '../upload/upload.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @ManyToOne(() => Upload, { nullable: true, cascade: true })
  @JoinColumn({ name: 'thumbnail_key', referencedColumnName: 'key' })
  thumbnail: Upload;

  @Column()
  contents: string;

  @Column()
  subtitle: string;

  @Column({ type: 'date' })
  created_at: Date;

  @Column()
  views: number = 0;

  @Column({ type: 'text', array: true })
  likes: string[];

  @ManyToMany(() => Comment, (comment) => comment.blog)
  @JoinTable({
    name: 'blog_comments_comment',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'comment_id', //
      referencedColumnName: 'id',
    },
  })
  comments?: Comment[];

  @ManyToMany(() => Tech, (tech) => tech.blogs)
  @JoinTable({
    name: 'blog_techs_tech',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tech_id', //
      referencedColumnName: 'id',
    },
  })
  techs?: Tech[];

  constructor(
    title: string,
    subtitle: string,
    contents: string,
    thumbnail: Upload,
    views: number,
    likes: string[],
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.contents = contents;
    this.thumbnail = thumbnail;
    this.views = views;
    this.likes = likes;
    this.created_at = new Date();
  }
}
