import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tech } from './tech.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(Tech) private readonly techRepository: Repository<Tech>,
  ) {}

  async create(name: string): Promise<Tech> {
    const existing = await this.techRepository.findOne({ where: { name } });

    if (existing) {
      return existing;
    }

    const tech = this.techRepository.create({ name });
    return await this.techRepository.save(tech);
  }

  findAll(): Promise<Tech[]> {
    return this.techRepository.find();
  }
}
