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

    await this.redisService.incr(`traffic:pv:${todayCompact}`);
    await this.redisService.expire(`traffic:pv:${todayCompact}`, 60 * 60 * 24 * 40);

    if (isNew) {
      await this.redisService.incr(`traffic:uv:${todayCompact}`);
      await this.redisService.expire(`traffic:uv:${todayCompact}`, 60 * 60 * 24 * 40);
    }

    return { ok: true, duplicated: !isNew };
  }
}
