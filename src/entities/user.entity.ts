import { IsEnum, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  ADMIN,
  AMBULANCE,
  HOSPITAL,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  password: string;

  @Column('enum', { enum: Role })
  @IsEnum(Role)
  type: Role;

  @Column('text', {
    nullable: true,
  })
  @ValidateIf((o) => o.type === Role.AMBULANCE)
  phone?: string;

  @Column('text', {
    nullable: true,
  })
  @ValidateIf((o) => o.type === Role.AMBULANCE)
  @IsString()
  patientStatus?: string;

  @Column('double', {
    nullable: true,
  })
  @ValidateIf((o) => o.type === Role.HOSPITAL)
  @IsNumber()
  latitude?: number;

  @Column('double', {
    nullable: true,
  })
  @ValidateIf((o) => o.type === Role.HOSPITAL)
  @IsNumber()
  longitude?: number;

  @Column('integer', {
    nullable: true,
  })
  @ValidateIf((o) => o.type === Role.HOSPITAL)
  @IsNumber()
  bed?: number;
}
