import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Career } from '../career/career.entity';
import { Project } from '../project/project.entity';

@Entity()
export class Tech {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  level?: string;

  @Column({ nullable: true })
  type?: string;

  @ManyToMany(() => Career, (career) => career.techs)
  careers?: Career[];

  @ManyToMany(() => Project, (project) => project.techs)
  projects?: Project[];

  constructor() {
    this.name = '';
  }
}
