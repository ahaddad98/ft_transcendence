import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { ConversationUser } from './conversation-user.entity';
import { Message } from './message.entity';

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

  @OneToOne((type) => Channel, (channel) => channel.conversation, {
    onDelete: 'CASCADE',
  })
  channel: Channel;

  @Column({
    type: 'enum',
    enum: ConversationType,
    default: ConversationType.PRIVATE,
  })
  type?: ConversationType;

  @OneToMany(
    (type) => ConversationUser,
    (conversationUser) => conversationUser.conversation,
  )
  conversationUser: ConversationUser[];

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  updatedAt?: Date;
}
