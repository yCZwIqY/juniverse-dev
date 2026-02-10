import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('traffic_stats')
export class TrafficStat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date', unique: true })
  date!: string;

  @Column({ type: 'int', default: 0 })
  pageViews!: number;

  @Column({ type: 'int', default: 0 })
  uniqueVisitors!: number;
}
