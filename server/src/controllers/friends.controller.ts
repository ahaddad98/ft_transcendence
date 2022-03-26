import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { FriendService } from 'src/services/use-cases/friend/friend.service';
import { UserService } from 'src/services/use-cases/user/user.service';

@Controller('friends')
export class FriendsController {
  constructor(
    private friendsService: FriendService,
    private usersService: UserService,
    private dataService: DataService,
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

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  async findMyFriends(@Req() req) {
    const user: User = await this.usersService.findOneById(req.user.id);
    // console.log(user);
    return await this.dataService.findAllFriendOfUser(user);
  }

  @Post('users/me/:friendId')
  @UseGuards(JwtAuthGuard)
  async addNewFriend(@Req() req, @Param('friendId') friend: number) {
    return await this.dataService.addFriend(req.user.id, friend);
  }

  @Delete('users/me/:friendId')
  @UseGuards(JwtAuthGuard)
  async deleteFriend(@Req() req, @Param('friendId') friend: number) {
    return this.dataService.deleteFriend(req.user.id, friend);
  }

  @Delete(':id')
  async removeFriend(@Param('id') id: number) {
    return await this.friendsService.remove(id);
  }
}
