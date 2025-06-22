import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tech } from 'src/tech/tech.entity';
import { Upload } from '../upload/upload.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Upload, { cascade: true })
  @JoinTable({
    name: 'project_upload_images',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'upload_key',
      referencedColumnName: 'key',
    },
  })
  images?: Upload[];

  @ManyToOne(() => Upload, { nullable: true, cascade: true })
  @JoinColumn({ name: 'video_key', referencedColumnName: 'key' })
  video?: Upload;

  @ManyToOne(() => Upload, { nullable: true, cascade: true })
  @JoinColumn({ name: 'thumbnail_key', referencedColumnName: 'key' })
  thumbnail: Upload;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @ManyToMany(() => Tech, (tech) => tech.projects, { cascade: true })
  @JoinTable({
    name: 'project_tech_tech',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tech_id',
      referencedColumnName: 'id',
    },
  })
  techs?: Tech[];

  @Column('text')
  description: string;

  @Column()
  summary?: string;

  @Column()
  memberCount: number;

  @Column({ nullable: true })
  githubUrl?: string;

  @Column({ nullable: true })
  demoUrl?: string;

  @Column('text', { nullable: true })
  role?: string;

  constructor(
    id: number,
    title: string,
    startDate: Date,
    description: string,
    memberCount: number,
    thumbnail: Upload,
  ) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.description = description;
    this.memberCount = memberCount;
    this.thumbnail = thumbnail;
  }
}
