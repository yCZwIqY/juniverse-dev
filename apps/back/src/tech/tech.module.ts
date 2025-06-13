import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tech } from './tech.entity';
import { Career } from '../career/career.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tech, Career])],
})
export class TechModule {}
