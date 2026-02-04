import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UploadFileDto {
  // 소문자/숫자/대시/언더스코어만 허용 (S3 key 안전)
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-z0-9_-]+$/)
  refType!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  refId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  displayName?: string;
}
