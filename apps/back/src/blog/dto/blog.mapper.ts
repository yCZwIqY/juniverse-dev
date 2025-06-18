import { BlogDTO } from './blogDTO';
import { Blog } from '../blog.entity';

export function toBlogDTO(blog: Blog): BlogDTO {
  const dto = new BlogDTO(
    blog.id!,
    blog.title,
    blog.subtitle,
    blog.contents,
    blog.created_at,
    blog.views,
    blog.likes,
  );
  dto.thumbnail = blog.thumbnail;
  dto.techs = blog.techs?.map((tech) => tech.name) ?? [];
  dto.comments =
    blog.comments?.map((comment) => ({
      id: comment.id,
      name: comment.name,
      email: comment.email,
      comment: comment.comment,
    })) ?? [];

  return dto;
}
