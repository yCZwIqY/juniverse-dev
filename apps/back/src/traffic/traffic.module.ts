import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrafficController } from './traffic.controller';
import { TrafficService } from './traffic.service';
import { RedisService } from '../common/redis/redis.service';
import { TrafficStat } from '../dashboard/entities/traffic-stat.entity';
import { TrafficSyncService } from './traffic-sync.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficStat])],
  controllers: [TrafficController],
  providers: [TrafficService, RedisService, TrafficSyncService],
})
export class TrafficModule {}
