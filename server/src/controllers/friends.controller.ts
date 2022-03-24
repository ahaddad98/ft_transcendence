import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { FriendService } from 'src/services/use-cases/friend/friend.service';
import { UserService } from 'src/services/use-cases/user/user.service';

@Controller('friends')
export class FriendsController {
  constructor(
    private friendsService: FriendService,
    private usersService: UserService,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAllMyFriends(@Param('id') id: number) {
    const user: User = await this.usersService.findOneById(id);
    return await this.friendsService.findAllByUser(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllFriends() {
    return await this.friendsService.findAll();
  }

  @Delete(':id')
  async removeFriend(@Param('id') id: number) {
    return await this.friendsService.remove(id);
  }
}
