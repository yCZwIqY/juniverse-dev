import { Menu } from 'src/menus/entities/menu.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  title!: string;

  @Column({ length: 300, nullable: true })
  subtitle?: string;

  @Column({ type: 'text' })
  content!: string;

  @Index()
  @Column()
  menuId!: number;

  @ManyToOne(() => Menu, (menu) => menu.posts, { onDelete: 'RESTRICT' })
  menu!: Menu;

  @Column('text', { array: true, default: '{}' })
  tags?: string[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[];

  @Column({ type: 'int', default: 0 })
  viewCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
