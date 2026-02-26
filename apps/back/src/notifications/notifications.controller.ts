import { Body, Controller, Get, MessageEvent, Post, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';
import { NotificationDto } from './dto/notification.dto';
import { PushSubscriptionDto } from './dto/push-subscription.dto';
import { NotificationsPushService } from './notifications-push.service';

@Controller('/api/notifications')
export class NotificationsController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly notificationsPushService: NotificationsPushService,
  ) {}

  @Sse('stream')
  stream(): Observable<MessageEvent> {
    return fromEvent<NotificationDto>(this.eventEmitter, 'comment.alarm').pipe(
      map((payload) => ({
        type: 'comment.alarm',
        data: payload,
      })),
    );
  }

  @Get('push/public-key')
  getPublicKey() {
    return { publicKey: this.notificationsPushService.getPublicKey() };
  }

  @Post('push/subscribe')
  async subscribe(@Body() subscription: PushSubscriptionDto) {
    await this.notificationsPushService.saveSubscription(subscription);
    return { ok: true };
  }

  @Post('push/unsubscribe')
  async unsubscribe(@Body() subscription: PushSubscriptionDto) {
    await this.notificationsPushService.deleteSubscription(subscription);
    return { ok: true };
  }
}
