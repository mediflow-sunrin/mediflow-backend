import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  AMBULANCE = 'ambulance',
  HOSPITAL = 'hospital',
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
  role: Role;
}
