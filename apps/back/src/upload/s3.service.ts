import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucket: string;
  private domain: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION', 'ap-northeast-2'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
          '',
        ),
      },
      endpoint: this.configService.get<string>('AWS_BUCKET_ENDPOINT', ''),
      forcePathStyle: false,
    });
    this.bucket = this.configService.get<string>('AWS_BUCKET_NAME', '');
    this.domain = this.configService.get<string>('AWS_BUCKET_DOMAIN', '');
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `uploads/${uuidv4()}-${file.originalname}`;

    const fileStream = fs.createReadStream(file.path);

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: fileStream,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );

    fs.unlink(file.path, (err) => {
      if (err) console.error('Error deleting local file', err);
    });

    return {
      id: key,
      src: `${this.domain}/${key}`,
    };
  }

  async deleteFile(key: string): Promise<void> {
    try {
      console.log(key);
      await this.s3.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
      console.log(`✅ Deleted ${key}`);
    } catch (err) {
      console.error(`❌ Failed to delete ${key}`, err);
      throw err;
    }
  }
}
