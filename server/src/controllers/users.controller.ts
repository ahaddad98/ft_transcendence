import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { DataService } from 'src/services/data/data.service';
import { FriendService } from 'src/services/use-cases/friend/friend.service';
import { UserService } from 'src/services/use-cases/user/user.service';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';

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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findMyData(@Req() req) {
    console.log('samir');
    return this.userService.findOneById(req.user.id);
  }

  @Get('me/all')
  @UseGuards(JwtAuthGuard)
  async findMyAllUsers(@Req() req) {
    return await this.dataService.findAllExceptMyProfile(req.user.id);
  }

  @Get('me/stats')
  @UseGuards(JwtAuthGuard)
  async findMyStats(@Req() req) {
    // return this.dataService.findStatsOfUser(req.user.id);
  }

  @Get('me/friends')
  @UseGuards(JwtAuthGuard)
  async findMyFriends(@Req() req) {
    return await this.userService.findOneById(req.user.id).then((user) => {
      return this.dataService.findAllFriendOfUser(user);
    });
  }

  @Get('me/friends/:id')
  @UseGuards(JwtAuthGuard)
  async findMyFriend(@Req() req, @Param('id') id: number) {
    const user = await this.userService.findOneById(req.user.id);
    return await this.dataService.findAllFriendOfUser(user);
  }

  @Get(':id')
  findOneUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get(':id/friends')
  async findAllFriends(@Param('id') id: number) {
    return await this.userService.findOneById(id).then((user) => {
      return this.dataService.findAllFriendOfUser(user);
    });
  }

  // @Get(':id/stats')
  // @UseGuards(JwtAuthGuard)
  // async findStatsOfUser(@Param('id') id: number) {
  //   return this.dataService.findStatsOfUser(id);
  // }

  @Get('/next/')
  async getNextUser() {
    return await this.userService.getNextUser();
  }

  @Get('/random/')
  async getRandomUser() {
    return await this.userService.getRandomUser();
  }

  @Get('/leaderboard/')
  async leaderborad() {
    // console.log("leaderborad");
    return await this.userService.leaderboard();
  }
  
  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    await this.userService.remove(id);
    return { status: 201, message: 'User deleted' };
  }
}
