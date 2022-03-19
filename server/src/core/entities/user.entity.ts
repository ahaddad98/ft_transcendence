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

  @OneToMany((type) => Friend, (friend) => friend.user)
  friend: Friend[];

  @OneToOne((type) => Stats, (stats) => stats.user)
  stats?: Stats;

  @ManyToOne((type) => Channel, (channel) => channel.user)
  channel?: Channel;
}
