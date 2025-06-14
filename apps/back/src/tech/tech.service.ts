import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tech } from './tech.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(Tech) private readonly techRepository: Repository<Tech>,
  ) {}

  async create(tech: Tech): Promise<Tech> {
    const existing = await this.techRepository.findOne({
      where: { name: tech.name },
    });

    if (existing) {
      return existing;
    }

    const result = this.techRepository.create(tech);
    return this.techRepository.save(result);
  }

  findAll(): Promise<Tech[]> {
    return this.techRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  update(id: number, data: Partial<Tech>) {
    return this.techRepository.update(id, data);
  }

  remove(id: number) {
    return this.techRepository.delete(id);
  }
}
