import { Controller } from '@nestjs/common';
import { FriendService } from 'src/services/use-cases/friend/friend.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendService) {}
}
