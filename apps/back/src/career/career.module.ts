import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { Career } from './career.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tech } from 'src/tech/tech.entity';
import { TechModule } from '../tech/tech.module';

@Module({
  imports: [TypeOrmModule.forFeature([Career, Tech]), TechModule],
  providers: [CareerService],
  controllers: [CareerController],
})
export class CareerModule {}
