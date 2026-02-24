import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule],
  controllers: [NotificationsController],
})
export class NotificationsModule {
}
