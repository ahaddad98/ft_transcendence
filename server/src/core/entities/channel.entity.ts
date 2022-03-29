import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChannelUser } from './channel-user.entity';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

export enum ChannelType {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'enum', enum: ChannelType })
  type?: ChannelType;

  @Column({ unique: true })
  name: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  owner: User;

  @Column({ nullable: true })
  password?: string;

  @OneToOne((type) => Conversation, (conversation) => conversation.channel, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  conversation: Conversation;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;

  @OneToMany((type) => ChannelUser, (channelUser) => channelUser.channel)
  channelUser: ChannelUser[];

  @Column({ type: 'int', default: 0 })
  members: number;
}
