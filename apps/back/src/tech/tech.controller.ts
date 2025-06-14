import { Body, Controller, Get, Post } from '@nestjs/common';
import { Tech } from './tech.entity';
import { TechService } from './tech.service';

@Controller('api/tech')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Post()
  create(@Body() tech: Tech) {
    return this.techService.create(tech.name);
  }

  @Get()
  findAll() {
    return this.techService.findAll();
  }
}
