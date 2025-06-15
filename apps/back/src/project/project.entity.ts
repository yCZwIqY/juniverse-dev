import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tech } from 'src/tech/tech.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { array: true, nullable: true })
  images?: string[]; // S3 URL, base64 등

  @Column('text', { nullable: true })
  video?: string;

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
  memberCount: number;

  @Column({ nullable: true })
  gitHubUrl?: string;

  @Column({ nullable: true })
  DemoUrl?: string;

  @Column('text', { nullable: true })
  role?: string;

  constructor(
    id: number,
    title: string,
    startDate: Date,
    description: string,
    memberCount: number,
  ) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.description = description;
    this.memberCount = memberCount;
  }
}
