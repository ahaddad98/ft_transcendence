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

  async findConversationById(id: number): Promise<Conversation> {
    return await this.conversationRepository.findOne(id, {
      relations: ['message'],
    });
  }
  async saveNewConversation(conversation: Conversation) {
    return await this.conversationRepository.save(conversation);
  }

  async getConversationByUsers(user1id: number, user2id: number) {
    console.log('la a sahbi ma blansh');
    return await this.conversationRepository.find({
      where: [
        { userOneId: user1id, userTwoId: user2id },
        { userOneId: user2id, userTwoId: user1id },
      ],
      relations: ['message'],
    });
  }
  async updateTime(id: number, details: Object) {
    return await this.conversationRepository.update(id, details);
  }
  async remove(id: number) {
    await this.conversationRepository.delete(id);
  }
}
