import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne((type) => User, (user) => user.block, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn()
  block: User;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;
}
