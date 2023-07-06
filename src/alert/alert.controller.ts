import { Controller, Get, Query } from '@nestjs/common';
import { AlertService } from './alert.service';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Get()
  @ApiProperty({
    description: 'Get all alerts',
    required: false,
  })
  @ApiQuery({
    name: 'id',
    description: 'The building id of the alert',
    required: false,
  })
  findAll(@Query('id') id?: string) {
    return this.alertService.findAll(id);
  }
}
