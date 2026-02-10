import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProjectDto: CreateProjectDto,
  ) {
    if (typeof (createProjectDto as any).tags === 'string') {
      try {
        createProjectDto.tags = JSON.parse((createProjectDto as any).tags);
      } catch {
        createProjectDto.tags = (createProjectDto as any).tags.split(',').map((t: string) => t.trim()).filter(Boolean);
      }
    }
    if (typeof (createProjectDto as any).isToy === 'string') {
      createProjectDto.isToy = (createProjectDto as any).isToy === 'true';
    }
    if (typeof (createProjectDto as any).sourceCode === 'string') {
      try {
        createProjectDto.sourceCode = JSON.parse((createProjectDto as any).sourceCode);
      } catch {
        createProjectDto.sourceCode = {};
      }
    }
    if (typeof (createProjectDto as any).imageUrls === 'string') {
      try {
        (createProjectDto as any).imageUrls = JSON.parse((createProjectDto as any).imageUrls);
      } catch {
        (createProjectDto as any).imageUrls = [];
      }
    }
    createProjectDto.images = images ?? [];
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Param('isToy') isToy: boolean) {
    return this.projectsService.findAll(isToy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 10))
  update(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    if (typeof (updateProjectDto as any).tags === 'string') {
      try {
        updateProjectDto.tags = JSON.parse((updateProjectDto as any).tags);
      } catch {
        updateProjectDto.tags = (updateProjectDto as any).tags.split(',').map((t: string) => t.trim()).filter(Boolean);
      }
    }
    if (typeof (updateProjectDto as any).isToy === 'string') {
      updateProjectDto.isToy = (updateProjectDto as any).isToy === 'true';
    }
    if (typeof (updateProjectDto as any).sourceCode === 'string') {
      try {
        updateProjectDto.sourceCode = JSON.parse((updateProjectDto as any).sourceCode);
      } catch {
        updateProjectDto.sourceCode = {};
      }
    }
    if (typeof (updateProjectDto as any).imageUrls === 'string') {
      try {
        (updateProjectDto as any).imageUrls = JSON.parse((updateProjectDto as any).imageUrls);
      } catch {
        (updateProjectDto as any).imageUrls = [];
      }
    }
    updateProjectDto.images = images ?? [];
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
