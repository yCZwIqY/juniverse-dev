import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Career } from './career.entity';
import { CareerService } from './career.service';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  create(@Body() career: Partial<Career>) {
    return this.careerService.create(career);
  }

  @Get()
  findAll() {
    return this.careerService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() career: Partial<Career>) {
    return this.careerService.update(id, career);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.careerService.delete(id);
  }
}
