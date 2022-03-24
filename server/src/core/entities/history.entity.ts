import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum ResultType {
  VICTORY = 'victory',
  DEFEAT = 'defeat',
}

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User)
  @JoinColumn()
  enemy: User;

  @Column({ type: 'enum', enum: ResultType })
  result: ResultType;

  @ManyToOne((type) => User, (user) => user.history, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;
}
