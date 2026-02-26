import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { RedisService } from '../common/redis/redis.service';
import { NotificationDto } from './dto/notification.dto';
import { PushSubscriptionDto } from './dto/push-subscription.dto';

const SUBSCRIPTIONS_KEY = 'push:subscriptions';

type WebPushModule = {
  setVapidDetails: (subject: string, publicKey: string, privateKey: string) => void;
  sendNotification: (subscription: PushSubscriptionDto, payload?: string) => Promise<unknown>;
};

const loadWebPush = (): WebPushModule | null => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('web-push') as WebPushModule;
  } catch {
    return null;
  }
};

@Injectable()
export class NotificationsPushService {
  private readonly logger = new Logger(NotificationsPushService.name);
  private readonly publicKey: string;
  private readonly privateKey: string;
  private readonly subject: string;
  private readonly memorySubscriptions = new Map<string, string>();
  private readonly webpush = loadWebPush();

  constructor(
    private readonly config: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.publicKey = this.config.get<string>('WEB_PUSH_VAPID_PUBLIC_KEY') ?? '';
    this.privateKey = this.config.get<string>('WEB_PUSH_VAPID_PRIVATE_KEY') ?? '';
    this.subject = this.config.get<string>('WEB_PUSH_VAPID_SUBJECT') ?? 'mailto:admin@juniverse-dev.com';

    if (this.publicKey && this.privateKey && this.webpush) {
      this.webpush.setVapidDetails(this.subject, this.publicKey, this.privateKey);
    } else {
      this.logger.warn('Push notifications disabled. Check WEB_PUSH_VAPID keys and web-push dependency.');
    }
  }

  getPublicKey() {
    return this.publicKey;
  }

  async saveSubscription(subscription: PushSubscriptionDto) {
    if (!subscription?.endpoint) return;
    const encoded = JSON.stringify(subscription);
    this.memorySubscriptions.set(subscription.endpoint, encoded);
    await this.redisService.hset(SUBSCRIPTIONS_KEY, subscription.endpoint, encoded);
  }

  async deleteSubscription(subscription: PushSubscriptionDto) {
    if (!subscription?.endpoint) return;
    this.memorySubscriptions.delete(subscription.endpoint);
    await this.redisService.hdel(SUBSCRIPTIONS_KEY, subscription.endpoint);
  }

  @OnEvent('comment.alarm')
  async onCommentAlarm(payload: NotificationDto) {
    if (!this.isPushConfigured()) return;

    const subscriptions = await this.listSubscriptions();
    if (!subscriptions.length) return;

    const pushPayload = JSON.stringify({
      title: `${payload.postTitle} 새 댓글 알림`,
      body: `${payload.comment} (${new Date(payload.createdAt).toLocaleString('ko-KR')})`,
      url: '/comments',
    });

    await Promise.allSettled(
      subscriptions.map(async (subscription) => {
        try {
          await this.webpush!.sendNotification(subscription, pushPayload);
        } catch (error) {
          const statusCode = (error as { statusCode?: number })?.statusCode;
          if (statusCode === 404 || statusCode === 410) {
            await this.deleteSubscription(subscription);
          }
          this.logger.warn(`Push send failed (${statusCode ?? 'unknown'}): ${subscription.endpoint}`);
        }
      }),
    );
  }

  private async listSubscriptions() {
    const rows = await this.redisService.hvals(SUBSCRIPTIONS_KEY);
    const values = new Set<string>([...this.memorySubscriptions.values(), ...rows]);
    const list: PushSubscriptionDto[] = [];
    for (const row of values) {
      try {
        list.push(JSON.parse(row) as PushSubscriptionDto);
      } catch {
        // Ignore broken rows
      }
    }
    return list;
  }

  private isPushConfigured() {
    return Boolean(this.publicKey && this.privateKey && this.webpush);
  }
}
