import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { createHash } from 'crypto';
import { TrafficService } from './traffic.service';

@Controller('api/traffic')
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Post('visit')
  track(@Req() req: Request) {
    const forwarded = (req.headers['x-forwarded-for'] as string | undefined)
      ?.split(',')[0]
      ?.trim();
    const ip = forwarded || req.ip || req.socket.remoteAddress || 'unknown';
    const ua = req.headers['user-agent'] ?? 'unknown';
    const viewerKey = createHash('sha1').update(`${ip}|${ua}`).digest('hex');
    return this.trafficService.trackVisit(viewerKey);
  }
}
