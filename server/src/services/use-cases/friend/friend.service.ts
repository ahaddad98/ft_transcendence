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
    return this.friendRepository.find();
  }

  findAllByUser(userSearch: User) {
    return this.friendRepository.find({ user: userSearch });
  }

  // findAllOfUser():  Promise<Friend[]> {
  //     // return this.friendRepository.find({userId :});
  // }
  findOne(id: string): Promise<Friend> {
    return this.friendRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.friendRepository.delete(id);
  }

  async deleteFriend(conditions: Object): Promise<void> {
    await this.friendRepository.delete(conditions);
  }

  async save(friendId: number, newUser: User){
    const friend: Friend = new Friend();
    friend.friend = friendId;
    friend.user = newUser;
    return await this.friendRepository.save(friend);
  }
}
