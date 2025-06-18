import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { Tech } from '../tech/tech.entity';
import { TechService } from '../tech/tech.service';
import { ProjectDTO } from './dto/ProjectDTO';
import { toProjectDTO } from './dto/projest.mapper';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly techService: TechService,
  ) {}

  async create(data: ProjectDTO): Promise<Project> {
    const techEntities: Tech[] = [];
    if (data.techs && data.techs.length > 0) {
      for (const name of data.techs) {
        const tech = await this.techService.create({ name });
        techEntities.push(tech);
      }
    }

    const result = this.projectRepository.create({
      ...data,
      techs: techEntities,
    });

    const project = this.projectRepository.create(result);
    return this.projectRepository.save(project);
  }

  async update(id: number, data: ProjectDTO): Promise<Project> {
    const techEntities: Tech[] = [];
    if (data.techs && data.techs.length > 0) {
      for (const name of data.techs) {
        const tech = await this.techService.create({ name });
        techEntities.push(tech);
      }
    }

    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['techs'],
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    const updated = this.projectRepository.merge(project, {
      ...data,
      techs: techEntities,
    });
    return this.projectRepository.save(updated);
  }

  async delete(id: number): Promise<void> {
    const result = await this.projectRepository.delete(id);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['techs', 'images', 'video', 'thumbnail'],
    });
  }

  async findOne(id: number): Promise<ProjectDTO> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['techs', 'images', 'video', 'thumbnail'],
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return toProjectDTO(project);
  }
}
