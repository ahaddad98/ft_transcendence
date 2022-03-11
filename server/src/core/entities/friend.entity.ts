import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne((type) => User, (user) => user.friend, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  friend: number;
}
