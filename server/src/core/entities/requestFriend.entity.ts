import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum StatusRequest {
  ADD = 'add',
  PENDING = 'pending',
}

@Entity()
export class RequestFriend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.requester, { onDelete: 'CASCADE' })
  requester: User;
  @ManyToOne((type) => User, (user) => user.recipient, { onDelete: 'CASCADE' })
  recipient: User;

  // @Column({ type: 'enum', enum: StatusRequest })
  // status: StatusRequest;
}
