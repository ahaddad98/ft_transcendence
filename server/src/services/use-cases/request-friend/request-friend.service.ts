import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestFriend } from 'src/core/entities/requestFriend.entity';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestFriendService {
  constructor(
    @InjectRepository(RequestFriend)
    private RequestFriendRepository: Repository<RequestFriend>,
  ) {}

  async findAll(): Promise<RequestFriend[]> {
    return await this.RequestFriendRepository.find({
      relations: ['requester', 'recipient'],
    });
  }

  async findRequestByUsers(user1: User, user2: User) {
    return await this.RequestFriendRepository.findOne({
      where: [
        { requester: user1, recipient: user2 },
        { requester: user2, recipient: user1 },
      ],
      relations: ['requester', 'recipient']
    });
  }
  async sendRequestToNewFriend(newRequester: User, newRecipient: User) {
    const request: RequestFriend = new RequestFriend();
    request.requester = newRequester;
    request.recipient = newRecipient;
    return this.RequestFriendRepository.save(request);
  }

  async removeRequest(user1: User, user2: User) {
    const request: RequestFriend = await this.findRequestByUsers(user1, user2);
    return await this.RequestFriendRepository.delete(request.id);
  }
  async removeRequestById(id: number) {
    return await this.RequestFriendRepository.delete(id);
  }
}
