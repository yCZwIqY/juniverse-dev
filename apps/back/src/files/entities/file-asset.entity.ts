import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('files')
@Index(['refType', 'refId'])
export class FileAsset {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  refType!: string;

  @Column({ type: 'int' })
  refId!: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 500 })
  key!: string;

  @Column({ type: 'varchar', length: 1000 })
  url!: string;

  @Column({ type: 'varchar', length: 120 })
  mimeType!: string;

  @Column({ type: 'int' })
  size!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  originalName!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  displayName!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}
