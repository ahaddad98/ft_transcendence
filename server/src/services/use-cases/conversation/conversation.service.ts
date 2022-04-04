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
    return await this.conversationRepository.find({
      relations: ['conversationUser', 'conversationUser.user'],
    });
  }

  async findConversationById(id: number): Promise<Conversation> {
    return await this.conversationRepository.findOne(id, {
      relations: ['message'],
    });
  }

  async findUsersOfConversationById(id: number) {
    return await this.conversationRepository
      .createQueryBuilder('conversation')
      .where('conversation.id = :conversationId', { conversationId: id })
      .getOne();
  }

  async findConversationByIdWithQuery(id: number): Promise<Conversation> {
    return await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.message', 'message')
      .innerJoinAndSelect('message.sender', 'sender')
      .orderBy('message.createdAt', 'ASC')
      .where('conversation.id = :conversationId', { conversationId: id })
      .andWhere('message.hidden = :hidden', { hidden: false })
      .getOne();
  }
  
  async findLastMessageofConversationByIdWithQuery(id: number): Promise<Conversation> {
    return await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.message', 'message')
      .innerJoinAndSelect('message.sender', 'sender')
      .orderBy('message.createdAt', 'ASC')
      .where('conversation.id = :conversationId', { conversationId: id })
      .andWhere('message.hidden = :hidden', { hidden: false })
      .getOne();
  }

  async findConversationWithMessages(id: number) {
    const conversation: Conversation =
      await this.conversationRepository.findOne(id, {
        relations: ['message'],
      });
    console.log(conversation);
    return conversation;
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

  async findConversationOfChannel(newId: number) {
    return await this.conversationRepository.findOne({
      relations: ['channel'],
      where: {
        channel: {
          id: newId,
        },
      },
    });
  }
  async updateTime(id: number, details: Object) {
    return await this.conversationRepository.update(id, details);
  }
  async delete(id: number) {
    return await this.conversationRepository.delete(id);
  }

  async remove(conversation: Conversation) {
    return await this.conversationRepository.remove(conversation);
  }
}
