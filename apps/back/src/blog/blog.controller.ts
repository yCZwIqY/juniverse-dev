import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Comment } from './comment.entity';
import { BlogDTO } from './dto/blogDTO';
import { toBlogDTO } from './dto/blog.mapper';

@Controller('api/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async createBlog(@Body() blogData: BlogDTO): Promise<BlogDTO> {
    return this.blogService.createBlog(blogData);
  }

  @Put(':id')
  async updateBlog(
    @Param('id') blogId: number,
    @Body() blogData: Partial<BlogDTO>,
  ): Promise<BlogDTO> {
    return this.blogService.updateBlog(blogId, blogData);
  }

  @Delete(':id')
  async deleteBlog(@Param('id') blogId: number): Promise<void> {
    return this.blogService.deleteBlog(blogId);
  }

  @Get()
  findAll(): Promise<BlogDTO[]> {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BlogDTO> {
    const result = await this.blogService.getBlogById(id);
    return toBlogDTO(result);
  }

  @Post(':id/comments')
  async addComment(
    @Param('id') blogId: number,
    @Body() commentData: Partial<Comment>,
  ): Promise<Comment> {
    return this.blogService.addComment(blogId, commentData);
  }

  @Patch('comments/:commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() body: { password: string; comment: string },
  ): Promise<Comment> {
    return this.blogService.updateComment(
      commentId,
      body.password,
      body.comment,
    );
  }

  @Delete('comments/:commentId')
  async deleteComment(
    @Param('commentId') commentId: number,
    @Body('password') password: string,
  ): Promise<void> {
    return this.blogService.deleteComment(commentId, password);
  }
}
