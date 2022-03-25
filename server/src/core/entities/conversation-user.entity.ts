import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity()
export class ConversationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user?: User;

  @ManyToOne((type) => Conversation, (conversation) => conversation.conversationUser ,{ onDelete: 'CASCADE' })
  @JoinColumn()
  conversation: Conversation;
}
