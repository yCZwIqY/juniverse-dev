import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsPushService } from './notifications-push.service';
import { RedisService } from '../common/redis/redis.service';

@Module({
  imports: [EventEmitterModule],
  controllers: [NotificationsController],
  providers: [NotificationsPushService, RedisService],
})
export class NotificationsModule {
}
