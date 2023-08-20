import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'ID of the user',
  })
  @IsNotEmpty({
    message: 'ID is required',
  })
  @IsString({
    message: 'ID must be a string',
  })
  id!: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString({
    message: 'Password must be a string',
  })
  password!: string;
}
