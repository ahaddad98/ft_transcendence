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

export enum ConversationType {
  PRIVATE = 'private',
  CHANNEL = 'channel',
}

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany((type) => Message, (message) => message.conversation)
  message?: Message[];

  @Column({
    type: 'enum',
    enum: ConversationType,
    default: ConversationType.PRIVATE,
  })
  type?: ConversationType;

  @Column()
  userOneId: number;

  @Column()
  userTwoId: number;
  
  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  updatedAt?: Date;
}
