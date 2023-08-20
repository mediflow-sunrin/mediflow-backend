import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Building } from './buliding.entity';

export enum AlertType {
  DANGER,
  INFO,
}

@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', { enum: AlertType })
  type: AlertType;

  @Column('text')
  title: string;

  @Column('text')
  message: string;

  @ManyToOne(() => Building, (building) => building.alerts)
  building: Building;

  @CreateDateColumn()
  createdAt: Date;
}
