import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Building id',
  })
  @IsOptional()
  @IsUUID(4, {
    message: 'buildingId must be uuid',
  })
  buildingId?: string;
}
