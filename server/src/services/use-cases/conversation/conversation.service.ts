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

  // TODO khasni nfexiha
  async findPrivateConversationOfTwoUsers(myId: number, userId: number) {
    return await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.conversationUser', 'conversationUser')
      // .orderBy('message.createdAt', 'ASC')
      .where('conversation.type = :type', { type: 'private' })
      .andWhere('conversationUser.user.id = :id', { id: myId })
      // .andWhere('message.hidden = :hidden', { hidden: false })
      .getMany();
  }

  async findLastMessageofConversationByIdWithQuery(
    id: number,
  ): Promise<Conversation> {
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
    // console.log(conversation);
    return conversation;
  }

  async saveNewConversation(conversation: Conversation) {
    return await this.conversationRepository.save(conversation);
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
