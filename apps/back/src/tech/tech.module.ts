import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tech } from './tech.entity';
import { Career } from '../career/career.entity';
import { TechService } from './tech.service';
import { TechController } from './tech.controller';
import { Project } from '../project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tech, Career, Project])],
  providers: [TechService],
  controllers: [TechController],
  exports: [TechService],
})
export class TechModule {}
