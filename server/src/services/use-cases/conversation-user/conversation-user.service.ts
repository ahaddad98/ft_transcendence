import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationUser } from 'src/core/entities/conversation-user.entity';
import { Conversation } from 'src/core/entities/conversation.entity';
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

  async findAllMyPrivatesConversations(newUser: User) {
    return await this.conversationUserRepository
      .createQueryBuilder('conversationUser')
      .leftJoinAndSelect('conversationUser.conversation', 'conversation')
      .where('conversationUser.user.id = :user', { user: newUser.id })
      .andWhere('conversation.type = :type', {
        type: 'private',
      })
      .orderBy({
        'conversation.updatedAt': 'DESC',
      })
      .getMany();
  }

  async findConversationUser(conversationId: number, userId: number) {
    return await this.conversationUserRepository.findOne({
      relations: ['conversation', 'user'],
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
  async findUsersOfConversations(conversationId: number) {
    return await this.conversationUserRepository.find({
      relations: ['user'],
      where: {
        conversation: {
          id: conversationId,
        },
      },
    });
  }

  async findAllUsersInConversationWithoutMe(
    newConversation: Conversation,
    myId: number,
  ) {
    return await this.conversationUserRepository
      .createQueryBuilder('conversationUser')
      .leftJoinAndSelect('conversationUser.user', 'user')
      .where('conversationUser.conversation.id = :conversation', {
        conversation: newConversation.id,
      })
      .andWhere('conversationUser.user.id != :id', { id: myId })
      .getMany();
    // console.log(salam);
  }

  // async findPrivateConversationWithTwoUsers(myId: number, userId: number) {
  //   return await this.conversationUserRepository
  //     .createQueryBuilder('conversationUser')
  //     .leftJoinAndSelect('conversationUser.conversation', 'conversation')
  //     .leftJoinAndSelect('conversationUser.user', 'user')
  //     .where('conversationUser.user.id = :user', { user: myId })
  //     .andWhere('conversationUser.user.id = :user', { user: userId })
  //     // where()
  //     .getMany();
  // }

  async findUserInConversationWithoutMe(
    newConversation: Conversation,
    myId: number,
  ) {
    return await this.conversationUserRepository
      .createQueryBuilder('conversationUser')
      .leftJoinAndSelect('conversationUser.user', 'user')
      .where('conversationUser.conversation.id = :conversation', {
        conversation: newConversation.id,
      })
      .andWhere('conversationUser.user.id != :id', { id: myId })
      .getOne();
    // console.log(salam);
  }

  async delete(id: number) {
    return await this.conversationUserRepository.delete(id);
  }

  async remove(conversationUser: ConversationUser) {
    return await this.conversationUserRepository.remove(conversationUser);
  }
}
