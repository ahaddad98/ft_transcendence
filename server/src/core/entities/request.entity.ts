import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Notification } from './notification.entity';
import { User } from './user.entity';

export enum RequestType {
  FRIEND = 'friend',
  GAME = 'game',
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.requester, { onDelete: 'CASCADE' })
  requester: User;
  @ManyToOne((type) => User, (user) => user.recipient, { onDelete: 'CASCADE' })
  recipient: User;

  @Column({ type: 'enum', enum: RequestType })
  type: RequestType;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;
  // @OneToOne((type) => Notification, (notification) => notification.request)
  // notification: Notification;
}
