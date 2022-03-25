import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/core/entities/conversation.entity';
import { Message } from 'src/core/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({ relations: ['conversation'] });
  }

  async getallMessageOfoneOfmyConversations(newConversation: Conversation) {
    return await this.messageRepository.find({
      relations: ['sender'],
      where: {
        conversation: newConversation,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }
  
  async addNewMessage(message: Message): Promise<Message> {
    return await this.messageRepository.save(message);
  }
  async removeMessage(id: number) {
    await this.messageRepository.delete(id);
  }
}
