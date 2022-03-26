import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne((type) => User, (user) => user.friend, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn()
  friend: User;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;
}
