import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Friend } from 'src/core/entities/friend.entity';
import { User } from 'src/core/entities/user.entity';
import { DataService } from 'src/services/data/data.service';
import { FriendService } from 'src/services/use-cases/friend/friend.service';
import { UserService } from 'src/services/use-cases/user/user.service';
import path = require('path');
import { map, Observable, of } from 'rxjs';
import {
  saveImageToStorage,
  fullImagePath,
} from 'src/services/helpers/image-storage';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { HistoryService } from 'src/services/use-cases/history/history.service';

@Controller('users')
export class UsersController {
  constructor(
    private dataService: DataService,
    private userService: UserService,
    private friendService: FriendService,
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
    return this.dataService.findStatsOfUser(req.user.id);
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

  @Post('me/messages/:id')
  @UseGuards(JwtAuthGuard)
  async newMessage(@Req() req, @Param('id') id: number) {
    
  }


  @Post('me/updateProfile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadProfile(@UploadedFile() file: Express.Multer.File, @Req() req): Object {
    console.log(file);
    console.log(req.body);
    if (file)
      this.userService.updateAvatar(req.user.id, fullImagePath(file.filename));
    if (req.body.username)
      this.userService.updateUsername(req.user.id, req.body.username);
    return { succes: 'Profile is updated' };
  }

  @Post('me/friends/:friendId')
  @UseGuards(JwtAuthGuard)
  async addNewFriend(@Req() req, @Param('friendId') friend: number) {
    return await this.dataService.addFriend(req.user.id, friend);
  }

  @Post('me/history/:bool/:id')
  @UseGuards(JwtAuthGuard)
  async addNewStat(
    @Req() req,
    @Param('bool') win: string,
    @Param('id') userId: number,
  ) {
    const check: boolean = win === 'true';
    return await this.dataService.addNewStat(req.user.id, check, userId);
    // return await this.historyService.addNewStat(req.user.id, win, userId);
  }

  @Delete('me/friends/:friendId')
  @UseGuards(JwtAuthGuard)
  async deleteFriend(@Req() req, @Param('friendId') friend: number) {
    return this.dataService.deleteFriend(req.user.id, friend);
  }

  @Put('me/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req): Object {
    if (!file) return of({ error: 'haram walah haram' });
    this.userService.updateAvatar(req.user.id, fullImagePath(file.filename));
    return { succes: 'avatar is updated' };
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get(':id/friends')
  async findAllFriends(@Param('id') id: number) {
    return await this.userService.findOneById(id).then((user) => {
      return this.dataService.findAllFriendOfUser(user);
    });
  }

  @Get(':id/stats')
  @UseGuards(JwtAuthGuard)
  async findStatsOfUser(@Param('id') id: number) {
    // console.log('fen a jemi');
    return this.dataService.findStatsOfUser(id);
  }

  // Post

  @Put(':id/stats/:stat')
  async updateStats(@Param('id') id: number, @Param('stat') stat: string) {
    return this.dataService.updateStats(id, stat); // khasni n9ad hadi
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    await this.userService.remove(id);
    return { status: 201, message: 'User deleted' };
  }

  // @Post(':id/friends/:friendId')
  // async findAllFriend(
  //   @Param('id') userId: number,
  //   @Param('friendId') friendId: number,
  // ) {
  //   this.dataService.addFriend(userId, friendId);
  // }

  // @Put(':id/avatar')
  // @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  // uploadAvatar(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Param('id') id: number,
  // ): Object {
  //   if (!file) return of({ error: 'haram walah haram' });
  //   this.userService.updateAvatar(id, fullImagePath(file.filename));
  //   return { succes: 'avatar is updated' };
  // }
}
