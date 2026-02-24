import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ArrayContains, DataSource, ILike, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Menu } from '../menus/entities/menu.entity';
import { Comment } from '../comments/entities/comment.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { FindPostsDto } from './dto/find-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from '../common/dto/create-comment.dto';
import { RedisService } from '../common/redis/redis.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PostsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Menu) private readonly menuRepo: Repository<Menu>,
    private readonly redisService: RedisService,
    private eventEmitter: EventEmitter2,
  ) {}

  private async ensureMenu(menuId: number, children: boolean = false) {
    const menu = await this.menuRepo.findOne({ where: { id: menuId }, relations: { children } });
    if (!menu) throw new BadRequestException('menuId가 유효하지 않습니다.');
    return menu;
  }

  async create(dto: CreatePostDto) {
    await this.ensureMenu(dto.menuId);

    const post = this.postRepo.create({
      title: dto.title,
      subtitle: dto.subtitle ?? undefined,
      content: dto.content,
      menuId: dto.menuId,
      tags: dto.tags,
      viewCount: 0,
    });

    return await this.postRepo.save(post);
  }

  collectMenuIds(menu: Menu): number[] {
    const ids = [menu.id];

    if (menu.children?.length) {
      for (const child of menu.children) {
        ids.push(...this.collectMenuIds(child));
      }
    }

    return ids;
  }

  async findAll(query: FindPostsDto) {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 10, 50);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.menuId && String(query.menuId) !== '0') {
      const menu = await this.ensureMenu(query.menuId, true);
      const menuIds = this.collectMenuIds(menu);

      console.log('menuIds: ', menuIds);
      where.menuId = In(menuIds);
    }

    if (query.q?.trim()) {
      const q = query.q?.trim();

      const [items, total] = await this.postRepo.findAndCount({
        where: [
          { ...where, title: ILike(`%${q}%`) },
          { ...where, content: ILike(`%${q}%`) },
          {
            ...where,
            tags: ArrayContains([q]),
          },
        ],
        relations: { menu: true, comments: true },
        order: { createdAt: 'DESC' },
        skip,
        take: limit,
      });

      return { page, limit, total, items };
    }

    const [items, total] = await this.postRepo.findAndCount({
      where,
      relations: { menu: true, comments: true },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return { page, limit, total, items };
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: { menu: true, comments: true },
      order: { comments: { createdAt: 'ASC' } },
    });

    if (!post) throw new NotFoundException('post not found');

    const prev = await this.postRepo
      .createQueryBuilder('p')
      .select(['p.id', 'p.title', 'p.subtitle', 'p.createdAt'])
      .where('p.createdAt > :createdAt', { createdAt: post.createdAt })
      .andWhere('p.menuId = :menuId', { menuId: post.menu.id })
      .orderBy('p.createdAt', 'ASC')
      .addOrderBy('p.id', 'ASC')
      .getOne();

    const next = await this.postRepo
      .createQueryBuilder('p')
      .select(['p.id', 'p.title', 'p.subtitle', 'p.createdAt'])
      .where('p.createdAt < :createdAt', { createdAt: post.createdAt })
      .andWhere('p.menuId = :menuId', { menuId: post.menu.id })
      .orderBy('p.createdAt', 'DESC')
      .addOrderBy('p.id', 'DESC')
      .getOne();

    return {
      ...post,
      prev: prev
        ? { id: prev.id, title: prev.title, subtitle: prev.subtitle }
        : null,
      next: next
        ? { id: next.id, title: next.title, subtitle: next.subtitle }
        : null,
    };
  }

  async findRecents() {
    return await this.postRepo.find({
      relations: {
        menu: true,
        comments: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: 6,
    });
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.postRepo.findOne({
      where: { id },
    });
    if (!post) throw new NotFoundException('post not found');
    if (dto.menuId) await this.ensureMenu(dto.menuId);
    post.tags = dto.tags ?? [];
    if (dto.title !== undefined) post.title = dto.title;
    if (dto.subtitle !== undefined) post.subtitle = dto.subtitle ?? null;
    if (dto.content !== undefined) post.content = dto.content;
    if (dto.menuId !== undefined) post.menuId = dto.menuId;

    return await this.postRepo.save(post);
  }

  async remove(id: number) {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('post not found');
    await this.postRepo.delete({ id });
    return { ok: true };
  }

  async increaseViewCount(id: number, viewerKey: string) {
    const dedupeKey = `post:${id}:viewed:${viewerKey}`;
    const isNew = await this.redisService.setIfNotExists(
      dedupeKey,
      '1',
      60 * 60 * 24,
    );
    if (!isNew) return { ok: true, duplicated: true };

    const todayCompact = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    void Promise.allSettled([
      this.redisService.zincrby(`popular:${todayCompact}`, 1, String(id)),
      this.redisService.zincrby(`popular:all`, 1, String(id)),
    ]);

    const result = await this.postRepo.increment({ id }, 'viewCount', 1);
    if (!result.affected) throw new NotFoundException('post not found');
    return { ok: true };
  }

  async addComment(postId: number, dto: CreateCommentDto) {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('post not found');

    const comment = this.commentRepo.create({
      postId,
      content: dto.content,
      authorName: dto.authorName,
      authorId: dto.authorId,
    });

    const result = await this.commentRepo.save(comment);
    this.eventEmitter.emit('comment.alarm', {
      postTitle: post.title,
      comment: result.content,
      createdAt: result.createdAt,
    });
    return result;
  }

  async deleteComment(postId: number, commentId: number) {
    // postId까지 같이 조건 걸어야 다른 글 댓글 삭제 방지
    const result = await this.commentRepo.delete({ id: commentId, postId });
    if (!result.affected) throw new NotFoundException('comment not found');
    return { ok: true };
  }
}
