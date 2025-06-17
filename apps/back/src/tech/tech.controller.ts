import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Tech } from './tech.entity';
import { TechService } from './tech.service';

@Controller('api/techs')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Post()
  create(@Body() tech: Tech) {
    return this.techService.create(tech);
  }

  @Get()
  findAll() {
    return this.techService.findAll();
  }

  @Put(':id')
  update(@Param() id: number, @Body() tech: Tech) {
    return this.techService.update(id, tech);
  }

  @Delete(':id')
  remove(@Param() id: number) {
    return this.techService.remove(id);
  }
}
