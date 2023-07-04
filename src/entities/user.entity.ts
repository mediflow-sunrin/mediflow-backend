import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Building } from './buliding.entity';

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

  @ManyToOne(() => Building, (building) => building.users, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  building: Building;
}
