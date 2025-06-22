import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { ProjectDTO } from './dto/ProjectDTO';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() dto: ProjectDTO): Promise<Project> {
    return this.projectService.create(dto);
  }

  @Get()
  findAll(): Promise<ProjectDTO[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProjectDTO> {
    return this.projectService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ProjectDTO): Promise<Project> {
    return this.projectService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.projectService.delete(+id);
  }
}
