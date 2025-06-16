import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Project } from '../project/project.entity';

@Entity()
export class Upload {
  @PrimaryColumn()
  key: string;

  @Column()
  src: string;

  @Column()
  name?: string;

  @OneToMany(() => Project, (project) => project.video)
  videoProjects?: Project[];

  @OneToMany(() => Project, (project) => project.images)
  imageProjects?: Project[];

  constructor(key: string, src: string) {
    this.key = key;
    this.src = src;
  }
}
