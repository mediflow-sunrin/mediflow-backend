import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { BuildingService } from './building.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  findAll() {
    return this.buildingService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  create(@Body() body: CreateBuildingDto) {
    return this.buildingService.create(body);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() body: UpdateBuildingDto) {
    return this.buildingService.update(id, body);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string) {
    return this.buildingService.delete(id);
  }
}
