import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Alert } from './alert.entity';

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

  @OneToMany(() => Alert, (alert) => alert.building, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  alerts: Alert[];
}
