import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enemyId: number;

  @Column()
  win: boolean;

  @ManyToOne((type) => User, (user) => user.history, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  createdAt?: Date;
}
