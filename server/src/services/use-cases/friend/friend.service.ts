import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';
import { Friend } from '../../../core/entities/friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendsRepository: Repository<Friend>,
  ) {}

  findAll(): Promise<Friend[]> {
    return this.friendsRepository.find();
  }

  findAllByUser(userSearch: User) {
    return this.friendsRepository.find({ user: userSearch });
  }

  // findAllOfUser():  Promise<Friend[]> {
  //     // return this.friendsRepository.find({userId :});
  // }
  findOne(id: string): Promise<Friend> {
    return this.friendsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.friendsRepository.delete(id);
  }

  async deleteFriend(conditions: Object): Promise<void> {
    await this.friendsRepository.delete(conditions);
  }

  async save(friendId: number, newUser: User): Promise<Friend> {
    const friend: Friend = new Friend();
    friend.friend = friendId;
    friend.user = newUser;
    return await this.friendsRepository.save(friend);
  }
}
