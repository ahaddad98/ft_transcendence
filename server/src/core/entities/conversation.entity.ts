import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
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

  @OneToOne((type) => Channel, (channel) => channel.conversation)
  channel: Channel;

  @Column({
    type: 'enum',
    enum: ConversationType,
    default: ConversationType.PRIVATE,
  })
  type?: ConversationType;
  

  
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  userOne: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  userTwo: User;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  updatedAt?: Date;
}
