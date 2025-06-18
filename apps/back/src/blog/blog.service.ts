import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Tech } from '../tech/tech.entity';
import { toBlogDTO } from './dto/blog.mapper';
import { BlogDTO } from './dto/blogDTO';
import { S3Service } from '../upload/s3.service';
import { TechService } from '../tech/tech.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private readonly s3Service: S3Service,
    private readonly techService: TechService,
  ) {}

  async createBlog(data: BlogDTO): Promise<BlogDTO> {
    const techEntities: Tech[] = [];
    if (data.techs && data.techs.length > 0) {
      for (const name of data.techs) {
        const tech = await this.techService.create({ name });
        techEntities.push(tech);
      }
    }

    const blog = this.blogRepository.create({
      ...data,
      created_at: new Date(),
      techs: techEntities,
      comments: [],
      views: 0,
      likes: [],
    });

    const saved = await this.blogRepository.save(blog);
    return toBlogDTO(saved);
  }

  async updateBlog(
    blogId: number,
    blogData: Partial<BlogDTO>,
  ): Promise<BlogDTO> {
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
      relations: ['thumbnail', 'techs', 'comments'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    blog.title = blogData.title ?? blog.title;
    blog.subtitle = blogData.subtitle ?? blog.subtitle;
    blog.contents = blog.contents ?? [];
    blog.likes = blog.likes ?? 0;
    blog.views = blog.views ?? [];

    if (blogData.techs) {
      const techEntities: Tech[] = [];
      for (const techName of blogData.techs) {
        const tech = await this.techService.create({ name: techName } as Tech);
        techEntities.push(tech);
      }
      blog.techs = techEntities;
    }

    const updated = await this.blogRepository.save(blog);
    return toBlogDTO(updated);
  }

  async deleteBlog(blogId: number): Promise<void> {
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
      relations: ['thumbnail', 'comments'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.thumbnail) {
      await this.s3Service.deleteFile(blog.thumbnail.key);
    }

    if (blog.comments && blog.comments?.length > 0) {
      await this.commentRepository.remove(blog.comments);
    }

    await this.blogRepository.remove(blog);
  }

  async getAllBlogs(): Promise<BlogDTO[]> {
    const blogs = await this.blogRepository.find({
      relations: ['comments', 'techs', 'thumbnail'],
    });
    return blogs.map(toBlogDTO);
  }

  async getBlogById(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['comments', 'techs', 'thumbnail'],
    });
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async addComment(
    blogId: number,
    commentData: Partial<Comment>,
  ): Promise<Comment> {
    const blog = await this.blogRepository.findOne({ where: { id: blogId } });
    if (!blog) throw new NotFoundException('Blog not found');

    const newComment = this.commentRepository.create({
      comment: commentData.comment,
      email: commentData.email,
      blog,
    });

    return this.commentRepository.save(newComment);
  }

  async updateComment(
    commentId: number,
    password: string,
    newComment: string,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    comment.comment = newComment;
    return this.commentRepository.save(comment);
  }

  async deleteComment(commentId: number, password: string): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    await this.commentRepository.remove(comment);
  }
}
