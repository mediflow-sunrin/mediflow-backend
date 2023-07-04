import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty({
    description: 'Building name',
  })
  @IsString({
    message: 'name must be string',
  })
  name: string;

  @ApiProperty({
    description: 'Building contact',
  })
  @IsString({
    message: 'contact must be string',
  })
  contact: string;

  @ApiProperty({
    description: 'Building exit',
  })
  @IsString({
    message: 'exit must be string',
  })
  exit: string[];
}
