import { Tech } from 'src/tech/tech.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Career {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column('text', { nullable: true })
  contents?: string;

  @ManyToMany(() => Tech, (tech) => tech.careers)
  @JoinTable()
  techs?: Tech[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.position = '';
    this.startDate = new Date();
  }
}
