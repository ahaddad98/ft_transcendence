import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Stats {
  constructor() {
    this.level = 0;
    this.wins = 0;
    this.loses = 0;
    this.rank = 'iron';
    this.honor = 0;
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => User, (user) => user.stats)
  @JoinColumn()
  user?: number;

  @Column()
  level: number;

  @Column()
  wins: number;

  @Column()
  loses: number;

  @Column()
  rank: string;

  @Column()
  honor: number;
}
