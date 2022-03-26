import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { User } from './user.entity';

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
  OWNER = 'owner',
}

@Entity()
export class ChannelUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user?: User;

  @ManyToOne((type) => Channel, (channel) => channel.channelUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  channel: Channel;

  @Column({ type: 'enum', enum: UserType, default: UserType.USER })
  userType: UserType;

  @Column({ type: 'boolean', default: false })
  block?: boolean;

  @Column({ type: 'boolean', default: false })
  mute?: boolean;
}
