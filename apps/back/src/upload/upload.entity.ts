import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Project } from '../project/project.entity';
import { Blog } from 'src/blog/blog.entity';

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

  @OneToMany(() => Project, (project) => project.thumbnail)
  thumbnailProjects?: Project;

  @OneToMany(() => Blog, (blog) => blog.thumbnail)
  thumbnailBlog?: Blog[];

  constructor(key: string, src: string) {
    this.key = key;
    this.src = src;
  }
}
