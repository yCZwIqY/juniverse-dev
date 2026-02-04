import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Tree('closure-table')
@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  name!: string;

  @Column({ type: 'int' })
  depth!: number;

  @Column({ type: 'int', name: 'seq_no' })
  seqNo!: number;

  /** 부모 메뉴 */
  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent?: Menu;

  /** 자식 메뉴 */
  @TreeChildren()
  children!: Menu[];

  @OneToMany(() => Post, (post) => post.menu)
  posts?: Post[];
}
