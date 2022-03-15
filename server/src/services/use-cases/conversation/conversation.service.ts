import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/core/entities/conversation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  findAll(): Promise<Conversation[]> {
    return this.conversationRepository.find();
  }

  async saveNewConversation(conversation: Conversation) {
    return await this.conversationRepository.save(conversation);
  }
}
