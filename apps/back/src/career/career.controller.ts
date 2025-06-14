import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerDTO } from './dto/CareerDTO';

@Controller('api/careers')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  create(@Body() career: CareerDTO) {
    return this.careerService.create(career);
  }

  @Get()
  findAll() {
    return this.careerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() career: CareerDTO) {
    return this.careerService.update(id, career);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.careerService.delete(id);
  }
}
