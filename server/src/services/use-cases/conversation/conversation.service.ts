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

  async findAll(): Promise<Conversation[]> {
    return await this.conversationRepository.find({relations: ['user']});
  }

  async findSpecificConversation() // hadi hta n9adha ghada daruri wa mo2akad
  {
  }
  async saveNewConversation(conversation: Conversation) {
    return await this.conversationRepository.save(conversation);
  }
}
