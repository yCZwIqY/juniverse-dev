import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { TrafficStat } from './entities/traffic-stat.entity';
import { RedisService } from '../common/redis/redis.service';
import { Post } from '../posts/entities/post.entity';
import { Comment } from '../comments/entities/comment.entity';
import { Project } from '../projects/entities/project.entity';
import { Menu } from '../menus/entities/menu.entity';

const dateToKey = (date: Date) => date.toISOString().slice(0, 10);

const getDateRange = (days: number) => {
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setDate(start.getDate() - (days - 1));
  return { start, end };
};

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(TrafficStat)
    private readonly trafficRepo: Repository<TrafficStat>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
    private readonly redisService: RedisService,
  ) {
  }

  async getTraffic(range: 'day' | 'week' | 'month') {
    const days = range === 'day' ? 1 : range === 'week' ? 7 : 30;
    const { start, end } = getDateRange(days);
    const stats = await this.trafficRepo.find({
      where: { date: Between(dateToKey(start), dateToKey(end)) },
      order: { date: 'ASC' },
    });

    const map = new Map(stats.map((s) => [s.date, s]));
    const items: { date: string, pageViews: number; uniqueVisitors: number }[] = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = dateToKey(d);
      const row = map.get(key);
      const compact = key.replace(/-/g, '');
      const [pvRaw, uvRaw] = await Promise.all([
        this.redisService.get(`traffic:pv:${compact}`),
        this.redisService.get(`traffic:uv:${compact}`),
      ]);
      const pv = pvRaw ? Number(pvRaw) : row?.pageViews ?? 0;
      const uv = uvRaw ? Number(uvRaw) : row?.uniqueVisitors ?? 0;
      items.push({
        date: key,
        pageViews: pv,
        uniqueVisitors: uv,
      });
    }

    const total = items.reduce(
      (acc, cur) => ({
        pageViews: acc.pageViews + cur.pageViews,
        uniqueVisitors: acc.uniqueVisitors + cur.uniqueVisitors,
      }),
      { pageViews: 0, uniqueVisitors: 0 },
    );

    return { range, items, total };
  }

  async getPopularPosts(range: 'day' | 'week' | 'month', limit = 10) {
    const days = range === 'day' ? 1 : range === 'week' ? 7 : 30;
    const keys = this.redisService.getPopularKeys(days);
    const popular = await this.redisService.getPopularPosts(keys, limit);
    const ids = popular.map((p) => Number(p.id));
    if (!ids.length) return [];

    const posts = await this.postRepo.findBy({ id: In(ids) });
    const postMap = new Map(posts.map((p) => [p.id, p]));

    return popular
      .map((p) => {
        const post = postMap.get(Number(p.id));
        if (!post) return null;
        return {
          id: post.id,
          title: post.title,
          views: p.score,
        };
      })
      .filter(Boolean);
  }

  async getSummary() {
    const [posts, comments, projects, menus] = await Promise.all([
      this.postRepo.count(),
      this.commentRepo.count(),
      this.projectRepo.count(),
      this.menuRepo.count(),
    ]);
    return { posts, comments, projects, menus };
  }
}
