import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tech } from '../tech/tech.entity';
import { Project } from './project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tech, Project])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
