import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly client: Redis | null;
  private readonly enabled: boolean;

  constructor(private readonly config: ConfigService) {
    const flag = (this.config.get<string>('REDIS_ENABLED') ?? 'true').toLowerCase();
    this.enabled = flag === 'true' || flag === '1' || flag === 'yes';
    if (!this.enabled) {
      this.client = null;
      return;
    }
    const host = this.config.get<string>('REDIS_HOST') ?? '127.0.0.1';
    const port = this.config.get<number>('REDIS_PORT') ?? 6379;
    const password = this.config.get<string>('REDIS_PASSWORD') ?? undefined;
    const connectTimeout = this.config.get<number>('REDIS_CONNECT_TIMEOUT_MS') ?? 800;
    const commandTimeout = this.config.get<number>('REDIS_COMMAND_TIMEOUT_MS') ?? 1200;
    const maxRetriesPerRequest = this.config.get<number>('REDIS_MAX_RETRIES_PER_REQUEST') ?? 1;
    const retryDelay = this.config.get<number>('REDIS_RETRY_DELAY_MS') ?? 100;

    this.client = new Redis({
      host,
      port,
      password,
      connectTimeout,
      commandTimeout,
      maxRetriesPerRequest,
      enableOfflineQueue: false,
      retryStrategy: (times) => (times <= 2 ? retryDelay : null),
    });
  }

  async setIfNotExists(key: string, value: string, ttlSeconds: number) {
    if (!this.client) return 'OK';
    return this.safe(
      () => this.client!.set(key, value, 'EX', ttlSeconds, 'NX'),
      null,
      'setIfNotExists',
    );
  }

  async incr(key: string) {
    if (!this.client) return 0;
    return this.safe(() => this.client!.incr(key), 0, 'incr');
  }

  async expire(key: string, ttlSeconds: number) {
    if (!this.client) return 0;
    return this.safe(() => this.client!.expire(key, ttlSeconds), 0, 'expire');
  }

  async get(key: string) {
    if (!this.client) return null;
    return this.safe(() => this.client!.get(key), null, 'get');
  }

  async zincrby(key: string, score: number, member: string) {
    if (!this.client) return '0';
    return this.safe(() => this.client!.zincrby(key, score, member), '0', 'zincrby');
  }

  async zrevrangeWithScores(key: string, limit: number) {
    if (!this.client) return [];
    return this.safe(
      () => this.client!.zrevrange(key, 0, limit - 1, 'WITHSCORES'),
      [],
      'zrevrangeWithScores',
    );
  }

  async zunionstore(tempKey: string, keys: string[]) {
    if (!keys.length) return 0;
    if (!this.client) return 0;
    return this.safe(
      () => this.client!.zunionstore(tempKey, keys.length, ...keys),
      0,
      'zunionstore',
    );
  }

  async del(key: string) {
    if (!this.client) return 0;
    return this.safe(() => this.client!.del(key), 0, 'del');
  }

  getPopularKeys(days: number) {
    const keys: string[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      keys.push(`popular:${d.toISOString().slice(0, 10).replace(/-/g, '')}`);
    }
    return keys;
  }

  async getPopularPosts(keys: string[], limit: number) {
    if (!keys.length) return [];
    if (keys.length === 1) {
      const raw = await this.zrevrangeWithScores(keys[0], limit);
      return this.toScoreList(raw);
    }
    const tempKey = `popular:tmp:${Date.now()}`;
    await this.zunionstore(tempKey, keys);
    const raw = await this.zrevrangeWithScores(tempKey, limit);
    await this.del(tempKey);
    return this.toScoreList(raw);
  }

  private toScoreList(raw: string[]) {
    const list: { id: string; score: number }[] = [];
    for (let i = 0; i < raw.length; i += 2) {
      list.push({ id: raw[i], score: Number(raw[i + 1]) });
    }
    return list;
  }

  private async safe<T>(
    task: () => Promise<T>,
    fallback: T,
    operation: string,
  ): Promise<T> {
    try {
      return await task();
    } catch (error) {
      this.logger.warn(`Redis ${operation} failed: ${(error as Error)?.message ?? 'unknown error'}`);
      return fallback;
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }
}
