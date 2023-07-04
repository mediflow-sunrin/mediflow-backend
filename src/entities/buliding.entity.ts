import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Building {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  address: string;

  @Column('text')
  contact: string;

  @Column('simple-array')
  exit: string[];

  @OneToMany(() => User, (user) => user.building, {
    nullable: true,
  })
  @JoinColumn()
  users: User[];
}
