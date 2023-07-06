import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { AlertType } from 'src/entities/alert.entity';

export class CreateAlertDto {
  @ApiProperty({
    description: 'The type of the alert',
  })
  @IsEnum(AlertType)
  type: AlertType;

  @ApiProperty({
    description: 'The title of the alert',
  })
  title: string;

  @ApiProperty({
    description: 'The message of the alert',
  })
  message: string;

  @ApiProperty({
    description: 'The building id of the alert',
  })
  buildingId: string;
}
