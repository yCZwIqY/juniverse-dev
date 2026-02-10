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
  position!: string;

  @Column()
  contribution!: string;

  @Column()
  content!: string;

  @Column()
  startDate?: string;

  @Column()
  endDate?: string;

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

  @Column({
    type: 'jsonb',
    nullable: true,
    default: () => "'{}'",
  })
  sourceCode?: Record<string, string>;
}
