import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('traffic')
  getTraffic(@Query('range') range: 'day' | 'week' | 'month' | 'year' = 'week') {
    return this.dashboardService.getTraffic(range);
  }

  @Get('popular-posts')
  getPopularPosts(
    @Query('range') range: 'day' | 'week' | 'month' | 'year' = 'week',
    @Query('limit') limit = '10',
  ) {
    return this.dashboardService.getPopularPosts(range, Number(limit));
  }

  @Get('summary')
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('recent-comments')
  getRecentComments(@Query('limit') limit = '5') {
    return this.dashboardService.getRecentComments(Number(limit));
  }
}
