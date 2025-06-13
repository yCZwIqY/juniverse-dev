import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Career {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  period: string;

  @Column('text', { array: true, nullable: true })
  contents?: string[];

  constructor() {
    this.id = 0;
    this.title = '';
    this.period = '';
    this.contents = [];
  }
}
