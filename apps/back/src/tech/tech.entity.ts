import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Career } from '../career/career.entity';

@Entity()
export class Tech {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Career, (career) => career.techs)
  careers?: Career[];

  constructor() {
    this.id = 0;
    this.name = '';
  }
}
