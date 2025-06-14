import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tech } from './tech.entity';
import { Career } from '../career/career.entity';
import { TechService } from './tech.service';
import { TechController } from './tech.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tech, Career])],
  providers: [TechService],
  controllers: [TechController],
  exports: [TechService],
})
export class TechModule {}
