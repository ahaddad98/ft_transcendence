import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';
import { Friend } from '../../../core/entities/friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
  ) {}

  findAll(): Promise<Friend[]> {
    return this.friendRepository.find({ relations: ['user', 'friend'] });
  }

  async findAllByUser(userSearch: User) {
    return await this.friendRepository.find({
      where: { user: userSearch },
      relations: ['friend'],
    });
  }

  async findMyFriend(userSearch: User, friend: User) {
    return await this.friendRepository.findOne({
      where: { user: userSearch, friend: friend },
    });
  }

  // findAllOfUser():  Promise<Friend[]> {
  //     // return this.friendRepository.find({userId :});
  // }
  findOne(id: string): Promise<Friend> {
    return this.friendRepository.findOne(id);
  }

  async findTwoFriends(userOneId: number, userTwoId: number) {
    return await this.friendRepository.find({
      relations: ['user', 'friend'],
      where:[ 
        {
          user: {
            id: userOneId,
          },
          friend: {
            id: userTwoId,
          },
        },
        {
          user: {
            id: userTwoId,
          },
          friend: {
            id: userOneId,
          },
        },
      ],
    });
  }

  async delete(id: number) {
    return await this.friendRepository.delete(id);
  }

  async removeFriends(friends: Friend[]) {
    this.friendRepository.remove(friends);
  }
  async deleteFriend(conditions: Object): Promise<void> {
    await this.friendRepository.delete(conditions);
  }

  async save(newFriend: Friend) {
    return await this.friendRepository.save(newFriend);
  }
}
