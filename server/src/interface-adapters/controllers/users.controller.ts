import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { DataService } from 'src/services/data/data.service';
import { UserService } from 'src/services/use-cases/user/user.service';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { UserParams } from 'src/services/helpers/validators';
import { User } from 'src/core/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private dataService: DataService,
    private userService: UserService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get('leaderboard')
  @UseGuards(JwtAuthGuard)
  async leaderborad() {
    return await this.userService.leaderboard();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findMyData(@Req() req) {
    try {
      return this.userService.findOneById(req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Get('me/all')
  @UseGuards(JwtAuthGuard)
  async findMyAllUsers(@Req() req) {
    try {
      return await this.dataService.findAllExceptMyProfile(req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Get('me/friends')
  @UseGuards(JwtAuthGuard)
  async findMyFriends(@Req() req) {
    try {
      const user: User = await this.userService.findOneById(req.user.id);
      return this.dataService.findAllFriendOfUser(user);
    } catch (err) {
      return err;
    }
  }

  @Get('me/friends/:id')
  @UseGuards(JwtAuthGuard)
  async findMyFriend(@Req() req) {
    try {
      const user = await this.userService.findOneById(req.user.id);
      return await this.dataService.findAllFriendOfUser(user);
    } catch (err) {
      return err;
    }
  }

  @Get(':id/friends')
  async findAllFriends(@Param() params: UserParams) {
    try {
      const user: User = await this.userService.findOneById(params.id);
      return this.dataService.findAllFriendOfUser(user);
    } catch (err) {
      return err;
    }
  }

  @Get('/next/')
  async getNextUser() {
    return await this.userService.getNextUser();
  }
  
  @Get('/random/:id')
  async getRandomUser(@Param('id') id) {
    return await this.userService.getRandomUser(id);
  }

  @Delete(':id')
  async removeUser(@Param() params: UserParams) {
    try {
      await this.userService.remove(params.id);
      return { status: 201, message: 'User deleted' };
    } catch (err) {
      return err;
    }
  }
}

// @Get('me/stats')
// @UseGuards(JwtAuthGuard)
// async findMyStats(@Req() req) {
//   // return this.dataService.findStatsOfUser(req.user.id);
// }

// @Get(':id')
// findOneUser(@Param('id') id: number) {
//   return this.userService.findOne(id);
// }
