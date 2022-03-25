import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { Notification } from './notification.entity';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  sender: User;

  @ManyToOne((type) => Conversation, (conversation) => conversation.message, {
    onDelete: 'CASCADE',
  })
  conversation: Conversation;

  @Column()
  content: string;

  // @ManyToOne((type) => Notification, (notification) => notification.message)
  // notification: Notification;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;
}
