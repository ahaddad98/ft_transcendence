import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Notification,
  NotificationType,
} from 'src/core/entities/notification.entity';
import { Request, RequestType } from 'src/core/entities/request.entity';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private RequestRepository: Repository<Request>,
  ) {}

  async findAll(): Promise<Request[]> {
    return await this.RequestRepository.find({
      relations: ['requester', 'recipient'],
    });
  }

  async findFriendRequestByUsers(user1: User, user2: User) {
    return await this.RequestRepository.findOne({
      where: [
        { requester: user1, recipient: user2, type: RequestType.FRIEND },
        { requester: user2, recipient: user1, type: RequestType.FRIEND },
      ],
      relations: ['requester', 'recipient'],
    });
  }

  async sendRequestToNewFriend(newRequester: User, newRecipient: User) {
    const request: Request = new Request();
    request.requester = newRequester;
    request.recipient = newRecipient;
    request.type = RequestType.FRIEND;
    return await this.RequestRepository.save(request);
  }

  async removeFriendRequest(user1: User, user2: User) {
    const request: Request = await this.findFriendRequestByUsers(user1, user2);
    return await this.RequestRepository.delete(request.id);
  }
  async removeRequestById(id: number) {
    return await this.RequestRepository.delete(id);
  }
}
