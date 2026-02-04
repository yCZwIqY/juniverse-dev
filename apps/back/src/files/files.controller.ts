import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseIntPipe } from '@nestjs/common';
import { FilesService } from './files.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('api/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 20 * 1024 * 1024 } }),
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: UploadFileDto,
  ) {
    return this.filesService.uploadOne({
      file,
      refType: query.refType,
      refId: query.refId,
      displayName: query.displayName,
    });
  }

  @Get()
  list(
    @Query('refType') refType: string,
    @Query('refId', ParseIntPipe) refId: number,
  ) {
    return this.filesService.list(refType, refId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.remove(id);
  }
}
