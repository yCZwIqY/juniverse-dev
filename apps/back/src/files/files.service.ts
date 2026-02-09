import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';

import { FileAsset } from './entities/file-asset.entity';

@Injectable()
export class FilesService {
  private s3: S3Client;
  private bucket: string;
  private domain: string;

  // ✅ 허용할 refType 목록 (원하는 것만 추가)
  private readonly allowedRefTypes = new Set(['post', 'user', 'comment']);

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(FileAsset)
    private readonly fileRepo: Repository<FileAsset>,
  ) {
    const region = this.config.get<string>('AWS_REGION')!;
    const endpoint =
      this.config.get<string>('AWS_BUCKET_ENDPOINT') || undefined;

    this.bucket = this.config.get<string>('AWS_BUCKET_NAME')!;
    this.domain = (this.config.get<string>('AWS_BUCKET_DOMAIN') || '').replace(
      /\/$/,
      '',
    );

    this.s3 = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.config.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  private assertAllowedRefType(refType: string) {
    if (!this.allowedRefTypes.has(refType)) {
      throw new BadRequestException(`refType '${refType}' is not allowed`);
    }
  }

  private guessExt(originalName?: string, mimeType?: string) {
    const fromName = originalName?.split('.').pop();
    if (fromName && fromName.length <= 10) return fromName.toLowerCase();

    const m = (mimeType || '').toLowerCase();
    if (m.includes('jpeg')) return 'jpg';
    if (m.includes('png')) return 'png';
    if (m.includes('webp')) return 'webp';
    if (m.includes('pdf')) return 'pdf';
    if (m.includes('zip')) return 'zip';
    return 'bin';
  }

  private buildKey(
    refType: string,
    refId: number,
    originalName?: string,
    mimeType?: string,
  ) {
    const ext = this.guessExt(originalName, mimeType);
    const id = uuidv4();
    return `refs/${refType}/${refId}/${id}.${ext}`;
  }

  private buildUrl(key: string) {
    // AWS_BUCKET_DOMAIN을 신뢰(예: CloudFront 도메인)
    if (this.domain) return `${this.domain}/${key}`;
    return key;
  }

  async uploadOne(params: {
    file: Express.Multer.File;
    refType: string;
    refId: number;
    displayName?: string;
  }) {
    const { file, refType, refId, displayName } = params;

    if (!file) throw new BadRequestException('file is required');
    this.assertAllowedRefType(refType);

    // 용량 제한(필요에 맞게 조정)
    const maxBytes = 20 * 1024 * 1024;
    if (file.size > maxBytes)
      throw new BadRequestException('파일 용량이 너무 큽니다. (최대 20MB)');

    const key = this.buildKey(refType, refId, file.originalname, file.mimetype);

    await new Upload({
      client: this.s3,
      params: {
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    }).done();

    const url = this.buildUrl(key);

    const saved = await this.fileRepo.save(
      this.fileRepo.create({
        refType,
        refId,
        key,
        url,
        mimeType: file.mimetype,
        size: file.size,
        originalName: file.originalname ?? null,
        displayName: displayName ?? null,
      }),
    );

    return saved;
  }

  async uploadList(
    files: Express.Multer.File[],
    refType: string,
    refId: number,
  ) {
    return Promise.all(
      files.map((file) =>
        this.uploadOne({
          refType,
          refId,
          file,
        }),
      ),
    );
  }

  async list(refType: string, refId: number) {
    this.assertAllowedRefType(refType);
    return this.fileRepo.find({
      where: { refType, refId },
      order: { createdAt: 'DESC' },
    });
  }

  async remove(fileId: number) {
    const file = await this.fileRepo.findOne({ where: { id: fileId } });
    if (!file) throw new NotFoundException('file not found');

    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: file.key,
      }),
    );

    await this.fileRepo.delete({ id: fileId });
    return { ok: true };
  }
}
