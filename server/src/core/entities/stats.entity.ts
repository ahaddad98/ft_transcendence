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
    this.level = 1;
    this.wins = 0;
    this.loses = 0;
    this.rank = 'iron';
    this.honor = 0;
    this.xp = 0;
    this.xpForLevel = 5;
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => User, (user) => user.stats, { onDelete: 'CASCADE' })
  @JoinColumn()
  user?: number;

  @Column()
  level: number;

  @Column()
  xpForLevel: number;

  @Column()
  xp: number;

  @Column()
  wins: number;

  @Column()
  loses: number;

  @Column()
  rank: string;

  @Column()
  honor: number;
}
