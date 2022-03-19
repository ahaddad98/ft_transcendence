import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => User, (user) => user.channel)
  user: User[];

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.USER })
  type?: UserType;

  @OneToOne((type) => Conversation, (conversation) => conversation.channel)
  @JoinColumn()
  conversation: Conversation;
}
