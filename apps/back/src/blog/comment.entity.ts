import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  comment: string;

  @OneToMany(() => Blog, (blog) => blog.comments)
  @JoinTable({
    name: 'blog_comments_comments',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'comment_id', //
      referencedColumnName: 'comments',
    },
  })
  blog: Blog;

  constructor(name: string, email: string, comment: string, blog: Blog) {
    this.name = name;
    this.comment = comment;
    this.email = email;
    this.blog = blog;
  }
}
