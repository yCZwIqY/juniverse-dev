import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { S3Service } from './s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  controllers: [UploadController],
  providers: [S3Service],
  exports: [S3Service],
})
export class UploadModule {}
