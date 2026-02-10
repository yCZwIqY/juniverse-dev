import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from '../common/redis/redis.service';
import { TrafficStat } from '../dashboard/entities/traffic-stat.entity';

const toKey = (date: Date) => date.toISOString().slice(0, 10);

@Injectable()
export class TrafficSyncService {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(TrafficStat)
    private readonly trafficRepo: Repository<TrafficStat>,
  ) {}

  @Cron('*/5 * * * *')
  async syncTraffic() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dates = [new Date(today), new Date(today.getTime() - 24 * 60 * 60 * 1000)];

    for (const date of dates) {
      const key = toKey(date);
      const compact = key.replace(/-/g, '');
      const [pvRaw, uvRaw] = await Promise.all([
        this.redisService.get(`traffic:pv:${compact}`),
        this.redisService.get(`traffic:uv:${compact}`),
      ]);
      const pageViews = pvRaw ? Number(pvRaw) : 0;
      const uniqueVisitors = uvRaw ? Number(uvRaw) : 0;
      await this.trafficRepo.save({ date: key, pageViews, uniqueVisitors });
    }
  }
}
