import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/core/entities/conversation.entity';
import { Not, Repository } from 'typeorm';
import { User } from '../../../core/entities/user.entity';

@Injectable()
export class UserService {
  userRepositor: Repository<User>;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.userRepositor = userRepository;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findAllExceptMyProfile(id: number) {
    return await this.userRepository.find({ id: Not(id) });
  }

  findSpecificUsers(details: Object): Promise<User[]> {
    return this.userRepository.find(details);
  }
  findOne(userId: number): Promise<User> {
    console.log('salam');
    return this.userRepository.findOne(
      { id: userId },
      { relations: ['friend'] },
    );
    // return this.userRepository.findOne({ username: id });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
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

  async getIdbyName(name: string) {
    const user = await this.userRepository.findOne({ username: name });
    return user.id;
  }
  // async updateConversation(id: number, newConversation: Conversation[]) {
  //   await this.userRepository.update(id, { conversation: newConversation });
  // }
  save(user: User): Promise<any> {
    // console.log(user);
    return this.userRepository.save(user);
  }

  async getNextUser(): Promise<User> {
    return await this.userRepository.findOne({ is_online: true });
  }

  async getRandomUser(): Promise<User> {
    let ids: number[] = await this.userRepository
      .find({ is_online: true })
      .then((users) => {
        let ids = [];
        users.forEach((user) => {
          ids.push(user.id);
        });
        return ids;
      });

    let random = Math.floor(Math.random() * ids.length);
    // await this.connection.getRepository(User).findOne()
    return await this.userRepository.findOne({ id: ids[random] });
  }
  async leaderboard() {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.level', 'DESC')
      .getMany();
    let winners = [];
    for (let i = 0; i < user.length; i++) {
      let winner = {
        avatar: user[i].avatar,
        username: user[i].username,
        email: user[i].email,
        online: user[i].is_online,
        level: user[i].level,
      };
      winners.push(winner);
    }
    return winners;
  }
}
