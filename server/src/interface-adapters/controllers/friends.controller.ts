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
import { FriendParams } from 'src/services/helpers/validators';
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
  async getAllMyFriends(@Param() params: FriendParams) {
    try {
      const user: User = await this.usersService.findOneById(params.id);
      return await this.friendsService.findAllByUser(user);
    } catch (err) {
      return err;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllFriends() {
    try {
      return await this.friendsService.findAll();
    } catch (err) {
      return err;
    }
  }

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  async findMyFriends(@Req() req) {
    try {
      const user: User = await this.usersService.findOneById(req.user.id);
      return await this.dataService.findAllFriendOfUser(user);
    } catch (err) {
      return err;
    }
  }

  @Post('users/me/:id')
  @UseGuards(JwtAuthGuard)
  async addNewFriend(@Req() req, @Param() params: FriendParams) {
    try {
      return await this.dataService.addFriend(req.user.id, params.id);
    } catch (err) {
      return err;
    }
  }

  @Delete('users/me/:id')
  @UseGuards(JwtAuthGuard)
  async deleteFriend(@Req() req, @Param() params: FriendParams) {
    try {
      return await this.dataService.deleteFriend(req.user.id, params.id);
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  async removeFriend(@Param() params: FriendParams) {
    try {
      return await this.friendsService.delete(params.id);
    } catch (err) {
      return err;
    }
  }
}
