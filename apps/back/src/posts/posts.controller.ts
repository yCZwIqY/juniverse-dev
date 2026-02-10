import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { createHash } from 'crypto';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostsDto } from './dto/find-posts.dto';
import { CreateCommentDto } from '../common/dto/create-comment.dto';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query() query: FindPostsDto) {
    return this.postsService.findAll(query);
  }

  @Get('recent')
  findRecents() {
    return this.postsService.findRecents();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(+id);
  }

  @Post(':id/views')
  increaseViews(@Param('id') id: number, @Req() req: Request) {
    const forwarded = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim();
    const ip = forwarded || req.ip || req.socket.remoteAddress || 'unknown';
    const ua = req.headers['user-agent'] ?? 'unknown';
    const viewerKey = createHash('sha1').update(`${ip}|${ua}`).digest('hex');
    return this.postsService.increaseViewCount(Number(id), viewerKey);
  }

  @Post(':id/comments')
  addComment(@Param('id') id: number, @Body() dto: CreateCommentDto) {
    return this.postsService.addComment(id, dto);
  }

  @Delete(':postId/comments/:commentId')
  deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.postsService.deleteComment(Number(postId), Number(commentId));
  }
}
