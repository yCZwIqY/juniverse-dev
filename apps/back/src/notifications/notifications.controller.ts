import { Controller, MessageEvent, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';
import { NotificationDto } from './dto/notification.dto';

@Controller('/api/notifications')
export class NotificationsController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Sse('stream')
  stream(): Observable<MessageEvent> {
    return fromEvent<NotificationDto>(this.eventEmitter, 'comment.alarm').pipe(
      map((payload) => ({
        type: 'comment.alarm',
        data: payload,
      })),
    );
  }
}
