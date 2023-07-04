import { IsEnum, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  ADMIN,
  AMBULANCE,
  HOSPITAL,
}

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: false })
  isAdmin: boolean;
}
