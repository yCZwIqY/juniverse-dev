import { Injectable } from '@nestjs/common';
import { RedisService } from '../common/redis/redis.service';

@Injectable()
export class TrafficService {
  constructor(private readonly redisService: RedisService) {}

  async trackVisit(viewerKey: string) {
    const todayKey = new Date().toISOString().slice(0, 10);
    const todayCompact = todayKey.replace(/-/g, '');
    const dedupeKey = `site:visited:${viewerKey}:${todayCompact}`;
    const isNew = await this.redisService.setIfNotExists(
      dedupeKey,
      '1',
      60 * 60 * 24,
    );

    void this.persistDailyTraffic(todayCompact, Boolean(isNew));

    return { ok: true, duplicated: !isNew };
  }

  private async persistDailyTraffic(todayCompact: string, isNew: boolean) {
    const jobs: Array<Promise<unknown>> = [
      this.redisService.incr(`traffic:pv:${todayCompact}`),
      this.redisService.expire(`traffic:pv:${todayCompact}`, 60 * 60 * 24 * 40),
    ];

    if (isNew) {
      jobs.push(
        this.redisService.incr(`traffic:uv:${todayCompact}`),
        this.redisService.expire(`traffic:uv:${todayCompact}`, 60 * 60 * 24 * 40),
      );
    }

    await Promise.allSettled(jobs);
  }
}
