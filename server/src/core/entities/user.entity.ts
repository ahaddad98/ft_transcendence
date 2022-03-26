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
import { History } from './history.entity';
import { Notification } from './notification.entity';
import { Request } from './request.entity';
import { Stats } from './stats.entity';

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

  @OneToMany((type) => History, (history) => history.user)
  history?: History[];

  @OneToOne((type) => Stats, (stats) => stats.user)
  stats?: Stats;

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
}
