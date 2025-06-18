import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Comment } from './comment.entity';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Upload } from '../upload/upload.entity';
import { Tech } from '../tech/tech.entity';
import { S3Service } from '../upload/s3.service';
import { TechService } from '../tech/tech.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Comment, Upload, Tech])],
  providers: [BlogService, S3Service, TechService],
  controllers: [BlogController],
})
export class BlogModule {}
