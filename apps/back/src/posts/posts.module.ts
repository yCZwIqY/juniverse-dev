import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '../menus/entities/menu.entity';
import { Comment } from '../comments/entities/comment.entity';
import { Post } from './entities/post.entity';
import { RedisService } from '../common/redis/redis.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Menu]), EventEmitterModule],
  controllers: [PostsController],
  providers: [PostsService, RedisService],
})
export class PostsModule {}
