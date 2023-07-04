import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty({
    description: 'Building name',
  })
  @IsString({
    message: 'name must be string',
  })
  name: string;

  @ApiProperty({
    description: 'Building address',
  })
  @IsString({
    message: 'address must be string',
  })
  address: string;

  @ApiProperty({
    description: 'Building contact',
  })
  @IsPhoneNumber('KR', {
    message: 'contact must be phone number',
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
