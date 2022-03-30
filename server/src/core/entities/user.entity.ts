import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Friend } from '../../core/entities/friend.entity';
import { Channel } from './channel.entity';
import { Notification } from './notification.entity';
import { Request } from './request.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  username?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  email: string;

  @OneToMany((type) => Friend, (friend) => friend.user)
  friend: Friend[];

  @Column({ nullable: true })
  secret?: string;

  @Column({ type: 'boolean', default: false })
  isVerified?: boolean;
  // @ManyToOne((type) => Channel, (channel) => channel.user, {
  //   onDelete: 'SET NULL',
  // })
  // channel?: Channel;

  @OneToMany((type) => Request, (request) => request.requester)
  requester?: Request[];

  @OneToMany((type) => Request, (request) => request.recipient)
  recipient?: Request[];

  @OneToMany((type) => Notification, (notification) => notification.user)
  notification?: Notification[];

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;

  @Column({ type: 'varchar', default: 'Moroco' })
  country?: string;

  @Column({ default: 1 })
  level?: number;

  @Column({ default: 0 })
  wins?: number;

  @Column({ default: 0 })
  loses?: number;

  @Column({ default: 0 })
  quit?: number;

  @Column({ type: 'boolean', default: false })
  is_online?: boolean;
}
