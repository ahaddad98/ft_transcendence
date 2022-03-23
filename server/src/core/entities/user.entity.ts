import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Friend } from '../../core/entities/friend.entity';
import { Channel } from './channel.entity';
import { Conversation } from './conversation.entity';
import { History } from './history.entity';
import { RequestFriend } from './requestFriend.entity';
import { Stats } from './stats.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  password: string;

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

  @ManyToOne((type) => Channel, (channel) => channel.user, { onDelete: 'SET NULL' })
  channel?: Channel;

  @OneToMany((type) => RequestFriend, (request) => request.requester)
  requester?: RequestFriend[];

  @OneToMany((type) => RequestFriend, (request) => request.recipient)
  recipient?: RequestFriend[];
}
