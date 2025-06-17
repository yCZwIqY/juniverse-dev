import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Career } from './career.entity';
import { Repository } from 'typeorm';
import { TechService } from '../tech/tech.service';
import { CareerDTO } from './dto/CareerDTO';
import { Tech } from '../tech/tech.entity';
import { toCareerDTO } from './dto/career.mapper';

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(Career) private careerRepository: Repository<Career>,
    private readonly techService: TechService,
  ) {}

  async create(career: CareerDTO) {
    const techEntities: Tech[] = [];
    for (const name of career.techs) {
      const tech = await this.techService.create({ name });
      techEntities.push(tech);
    }

    const result = this.careerRepository.create({
      ...career,
      techs: techEntities,
    });

    return this.careerRepository.save(result);
  }

  async findAll(): Promise<CareerDTO[]> {
    const careers = await this.careerRepository.find({ relations: ['techs'] });
    return careers.map(toCareerDTO);
  }

  async findOne(id: string): Promise<CareerDTO | null> {
    const career = await this.careerRepository.findOne({
      where: { id: Number(id) },
      relations: ['techs'],
    });
    return career ? toCareerDTO(career) : null;
  }

  async update(id: number, career: CareerDTO) {
    const techEntities: Tech[] = [];
    for (const name of career.techs) {
      const tech = await this.techService.create({ name });
      techEntities.push(tech);
    }

    const entity = await this.careerRepository.findOne({
      where: { id },
      relations: ['techs'],
    });

    if (!entity) {
      throw new Error('Career not found');
    }

    const updated = this.careerRepository.merge(entity, {
      ...career,
      techs: techEntities,
    });

    return this.careerRepository.save(updated);
  }

  delete(id: number) {
    return this.careerRepository.delete(id);
  }
}
