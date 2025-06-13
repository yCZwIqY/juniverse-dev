import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Career } from './career.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerService {
  constructor(@InjectRepository(Career) private careerRepository: Repository<Career>) {}

  create(career: Partial<Career>) {
    return this.careerRepository.save(career);
  }

  findAll(): Promise<Career[]> {
    return this.careerRepository.find();
  }

  update(id: number, career: Partial<Career>) {
    return this.careerRepository.update(id, career);
  }

  delete(id: number) {
    return this.careerRepository.delete(id);
  }
}
