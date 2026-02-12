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

  async getTraffic(range: 'day' | 'week' | 'month' | 'year') {
    const days = range === 'day' ? 1 : range === 'week' ? 7 : range === 'year' ? 365 : 30;
    const { start, end } = getDateRange(days);
    const stats = await this.trafficRepo.find({
      where: { date: Between(dateToKey(start), dateToKey(end)) },
      order: { date: 'ASC' },
    });

    const map = new Map(stats.map((s) => [s.date, s]));
    const items: { date: string, pageViews: number; uniqueVisitors: number }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = dateToKey(today);
    const todayCompact = todayKey.replace(/-/g, '');
    const [todayPvRaw, todayUvRaw] = await Promise.all([
      this.redisService.get(`traffic:pv:${todayCompact}`),
      this.redisService.get(`traffic:uv:${todayCompact}`),
    ]);
    const todayPv = todayPvRaw ? Number(todayPvRaw) : undefined;
    const todayUv = todayUvRaw ? Number(todayUvRaw) : undefined;
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = dateToKey(d);
      const row = map.get(key);
      const pv =
        key === todayKey
          ? todayPv ?? row?.pageViews ?? 0
          : row?.pageViews ?? 0;
      const uv =
        key === todayKey
          ? todayUv ?? row?.uniqueVisitors ?? 0
          : row?.uniqueVisitors ?? 0;
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

  async getPopularPosts(range: 'day' | 'week' | 'month' | 'year', limit = 10) {
    const days = range === 'day' ? 1 : range === 'week' ? 7 : range === 'year' ? 365 : 30;
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = dateToKey(today);
    const todayCompact = todayKey.replace(/-/g, '');
    const [todayPvRaw, todayUvRaw, todayRow] = await Promise.all([
      this.redisService.get(`traffic:pv:${todayCompact}`),
      this.redisService.get(`traffic:uv:${todayCompact}`),
      this.trafficRepo.findOne({ where: { date: todayKey } }),
    ]);
    const todayPageViews = todayPvRaw ? Number(todayPvRaw) : todayRow?.pageViews ?? 0;
    const todayUniqueVisitors = todayUvRaw ? Number(todayUvRaw) : todayRow?.uniqueVisitors ?? 0;

    const totals = await this.trafficRepo
      .createQueryBuilder('traffic')
      .select('SUM(traffic.pageViews)', 'pageViews')
      .addSelect('SUM(traffic.uniqueVisitors)', 'uniqueVisitors')
      .getRawOne<{ pageViews: string | null; uniqueVisitors: string | null }>();

    const totalPageViewsBase = totals?.pageViews ? Number(totals.pageViews) : 0;
    const totalUniqueVisitorsBase = totals?.uniqueVisitors ? Number(totals.uniqueVisitors) : 0;

    const totalPageViews =
      totalPageViewsBase - (todayRow?.pageViews ?? 0) + todayPageViews;
    const totalUniqueVisitors =
      totalUniqueVisitorsBase - (todayRow?.uniqueVisitors ?? 0) + todayUniqueVisitors;

    return {
      posts,
      comments,
      projects,
      menus,
      traffic: {
        today: {
          pageViews: todayPageViews,
          uniqueVisitors: todayUniqueVisitors,
        },
        total: {
          pageViews: totalPageViews,
          uniqueVisitors: totalUniqueVisitors,
        },
      },
    };
  }

  async getRecentComments(limit = 5) {
    const comments = await this.commentRepo.find({
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['post'],
    });

    return comments.map((comment) => ({
      id: comment.id,
      postId: comment.postId,
      postTitle: comment.post?.title ?? '',
      authorName: comment.authorName,
      content: comment.content,
      createdAt: comment.createdAt,
    }));
  }
}
