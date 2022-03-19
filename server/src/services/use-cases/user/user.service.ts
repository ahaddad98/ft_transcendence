import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/core/entities/conversation.entity';
import { Repository } from 'typeorm';
import { User } from '../../../core/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findSpecificUsers(details: Object): Promise<User[]> {
    return this.userRepository.find(details);
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(
      { username: id },
      { relations: ['friend'] },
    );
    // return this.userRepository.findOne({ username: id });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id, { relations: ['friend'] });
  }

  findOneByIdWithRelation(id: number, relation: Object): Promise<User> {
    return this.userRepository.findOne(id, relation);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async updateAvatar(id: number, path: string) {
    await this.userRepository.update(id, { avatar: path });
  }

  async updateUsername(id: number, newUsername: string) {
    await this.userRepository.update(id, { username: newUsername });
  }

  // async updateConversation(id: number, newConversation: Conversation[]) {
  //   await this.userRepository.update(id, { conversation: newConversation });
  // }
  save(user: User): Promise<any> {
    // console.log(user);
    return this.userRepository.save(user);
  }
}
