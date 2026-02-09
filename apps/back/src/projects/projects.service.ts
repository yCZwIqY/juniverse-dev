import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    private readonly fileService: FilesService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepo.save(
      this.projectRepo.create({
        ...createProjectDto,
        imageUrls: [],
      }),
    );

    let saveImages: string[] = [];

    if ((createProjectDto.images ?? []).length > 0) {
      const uploads = await this.fileService.uploadList(
        createProjectDto.images ?? [],
        'project',
        project.id,
      );

      saveImages = uploads.map((u) => u.url);
    }

    project.imageUrls = saveImages;
    return this.projectRepo.save(project);
  }

  findAll(isToy?: boolean) {
    return this.projectRepo.find({
      where: {
        isToy,
      },
    });
  }

  async findOne(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id },
    });

    if (!project) throw new NotFoundException('project not found');

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    let saveImages: string[] = [];

    if ((updateProjectDto.images ?? []).length > 0) {
      const uploads = await this.fileService.uploadList(
        updateProjectDto.images ?? [],
        'project',
        id,
      );

      saveImages = uploads.map((u) => u.url);
    }

    const project = await this.projectRepo.findOne({
      where: { id },
    });
    if (!project) throw new NotFoundException('project not found');
    const updatedProject = {
      ...project,
      ...updateProjectDto,
      imageUrls: [...(updateProjectDto.imageUrls ?? []), ...saveImages],
    };
    return await this.projectRepo.save(updatedProject);
  }

  async remove(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id },
    });
    if (!project) throw new NotFoundException('project not found');
    await this.projectRepo.delete({ id });
    return { ok: true };
  }
}
