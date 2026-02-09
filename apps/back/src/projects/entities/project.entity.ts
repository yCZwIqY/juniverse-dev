import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  content!: string;

  @Column()
  sourceCode?: string;

  @Column('text', { array: true, default: '{}' })
  tags?: string[];

  @Column()
  gitHubUrl?: string;

  @Column()
  demoUrl?: string;

  @Column('text', { array: true, default: '{}' })
  imageUrls?: string[];

  @Column()
  isToy!: boolean;
}
