import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./conversation.entity";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    senderId: number;

    // @ManyToOne((type) => Conversation, (conversation) => conversation.message, {onDelete: 'CASCADE'})
    // conversation: Conversation;

    @Column({type: 'timestamptz'})
    createdAt: Date;
}