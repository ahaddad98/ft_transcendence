import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany((type) => Message, (message) => message.conversation)
  message?: Message[];

  @ManyToMany((type) => User, (user) => user.conversation, {
    onDelete: 'CASCADE',
  })
  user: User[];

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  updatedAt?: Date;
}
