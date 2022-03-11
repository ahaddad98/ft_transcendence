import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Friend } from '../../core/entities/friend.entity';
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

  // @JoinColumn()
  @OneToMany((type) => Friend, (friend) => friend.user)
  friend: Friend[];

  @OneToOne(() => Stats, (stats) => stats.user)
  stats?: Stats;
}
