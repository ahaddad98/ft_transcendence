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

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => User, {onDelete: "CASCADE"})
  admin: User;

  @OneToMany((type) => User, (user) => user.channel)
  user: User[];

  @Column()
  password: string;

  @OneToOne((type) => Conversation, (conversation) => conversation.channel)
  @JoinColumn()
  conversation: Conversation;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;
}
