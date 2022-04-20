import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Friend } from '../../core/entities/friend.entity';
import { Block } from './block.entity';
import { Notification } from './notification.entity';
import { Request } from './request.entity';

export enum StatusType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  INGAME='ingame'
}

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

  @OneToMany((type) => Block, (block) => block.user)
  block: Block[];

  @Column({ type: 'bool', default: false })
  twoFactor?: boolean;

  @Column({ nullable: true })
  secret?: string;

  @Column({ type: 'boolean', default: false })
  isVerified?: boolean;

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

  @Column({ type: 'enum', enum: StatusType, default: StatusType.ONLINE })
  status?: StatusType
}
