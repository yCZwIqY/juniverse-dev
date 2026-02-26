import { Type, Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min, IsBoolean } from 'class-validator';

export class FindPostsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  menuId?: number;

  @IsOptional()
  @IsString()
  q?: string; // title/ content search

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  showAll?: boolean;
}
