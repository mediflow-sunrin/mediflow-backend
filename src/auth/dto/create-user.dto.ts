import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role, User } from 'src/entities/user.entity';

export class CreateBaseUserDto {
  bed: number;
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class CreateAmbulancUserDto
  extends CreateBaseUserDto
  implements Omit<User, keyof Omit<User, 'id' | 'password' | 'name' | 'type'>>
{
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  patientStatus?: string;

  @IsNotEmpty()
  @Transform(() => Role.AMBULANCE)
  @IsEnum(Role)
  type = Role.AMBULANCE;
}

export class CreateHospitalUserDto
  extends CreateBaseUserDto
  implements Omit<User, keyof Omit<User, 'id' | 'password' | 'name' | 'type'>>
{
  @IsNotEmpty()
  @IsNumber()
  latitude!: number;

  @IsNotEmpty()
  @IsNumber()
  longitude!: number;

  @IsNotEmpty()
  @IsNumber()
  bed!: number;

  @IsNotEmpty()
  @Transform(() => Role.HOSPITAL)
  @IsEnum(Role)
  type = Role.HOSPITAL;
}

export class CreateAdminUserDto extends CreateBaseUserDto {
  @IsNotEmpty()
  @Transform(() => Role.ADMIN)
  @IsEnum(Role)
  type = Role.ADMIN;
}
