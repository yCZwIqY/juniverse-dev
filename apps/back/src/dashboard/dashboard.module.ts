import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TrafficStat } from './entities/traffic-stat.entity';
import { Post } from '../posts/entities/post.entity';
import { Comment } from '../comments/entities/comment.entity';
import { Project } from '../projects/entities/project.entity';
import { Menu } from '../menus/entities/menu.entity';
import { RedisService } from '../common/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficStat, Post, Comment, Project, Menu])],
  controllers: [DashboardController],
  providers: [DashboardService, RedisService],
})
export class DashboardModule {}
