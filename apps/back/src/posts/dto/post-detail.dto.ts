import { PartialType } from '@nestjs/mapped-types';
import { Post } from '../entities/post.entity';

export class PostDetailDto extends PartialType(Post) {
  next!: Post | null;
  prev!: Post | null;
}
