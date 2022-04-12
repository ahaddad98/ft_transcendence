import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('game')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  //foreign key for user
  @ManyToOne((type) => User, (user) => user)
  @JoinColumn({ name: 'user1' })
  public user1: User;

  @Column({ default: 0 })
  public userId1: number;

  @ManyToOne((type) => User, (user) => user)
  @JoinColumn({ name: 'user2' })
  user2: User;

  @Column({ default: 0 })
  public userId2: number;

  @Column({ default: new Date() })
  TimeBegin: Date;

  @Column({ default: new Date() })
  TimeEnd: Date;

  @Column({ default: 0 })
  winner: number;

  @Column({ default: false })
  is_finished: boolean;

  @Column({ default: false })
  is_started: boolean;

  @Column({ default: false })
  is_rejected_by_user1: boolean;

  @Column({ default: false })
  is_rejected_by_user2: boolean;

  @Column({ default: false })
  is_accepted_by_user2: boolean;

  @Column({ default: 'default' })
  map: string;

  @Column({ default: '' })
  json_map: string;

  @Column({ default: 0,nullable:true })
  score_user1?: number;

  @Column({ default: 0 ,nullable:true})
  score_user2?: number;
}
