import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationUser } from 'src/core/entities/conversation-user.entity';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationUserService {
  constructor(
    @InjectRepository(ConversationUser)
    private conversationUserRepository: Repository<ConversationUser>,
  ) {}

  async findAll() {
    return await this.conversationUserRepository.find({
      relations: ['conversation', 'user'],
    });
  }

  async save(conversationUser: ConversationUser) {
    return await this.conversationUserRepository.save(conversationUser);
  }

  async findallMyConversations(newUser: User) {
    return await this.conversationUserRepository
      .createQueryBuilder('conversationUser')
      .leftJoinAndSelect('conversationUser.conversation', 'conversation')
      .where('conversationUser.user.id = :user', { user: newUser.id })
      .orderBy({
        'conversation.updatedAt': 'DESC',
      })
      .getMany();
  }
  
  // async findallMyConversations(newUser: User) {
  //   return await this.conversationUserRepository.find({
  //     where: { user: newUser },
  //     relations: ['conversation'],
  //     order: {
  //       conversation: 'ASC',
  //     },
  //   });
  // }

  async remove(id: number) {
    return await this.conversationUserRepository.delete(id);
  }
}
