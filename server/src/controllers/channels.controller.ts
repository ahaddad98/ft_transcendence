import {
  Body,
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
import {
  CreateChannelDto,
  CreatePublicChannelDto,
} from 'src/core/dtos/channel.dto';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { saveImageToStorage } from 'src/services/helpers/image-storage';
import { ChannelService } from 'src/services/use-cases/channel/channel.service';
import { UserService } from 'src/services/use-cases/user/user.service';
import { DataService } from 'src/services/data/data.service';
import { UserType } from 'src/core/entities/channel-user.entity';

@Controller('channels')
export class ChannelsController {
  constructor(
    private channelService: ChannelService,
    private userService: UserService,
    private dataService: DataService,
  ) {}

  @Get()
  async findChannels() {
    return await this.channelService.findAll();
  }

  @Get('all') // 
  @UseGuards(JwtAuthGuard)
  async findAllChannels(@Req() req) {
    return await this.dataService.findAllChannels(req.user.id);
  }

  @Get('users/me') // 
  @UseGuards(JwtAuthGuard)
  async findAllMyChannels(@Req() req) {
    return await this.dataService.findAllMyChannels(req.user.id);
  }

  @Get(':id')
  async findChannelById(@Param('id') id: number) {
    return await this.channelService.findChannelById(id);
  }

  @Get(':id/users/me/all')
  @UseGuards(JwtAuthGuard)
  async listAllUsersOfChannel(@Param('id') id: number, @Req() req) {
    return await this.dataService.listUsersOfChannel(id, req.user.id);
  }

  @Delete(':id')
  async deleteChannel(@Param('id') id: number) {
    await this.channelService.delete(id);
    return { status: 200, message: 'channel is removed' };
  }

  @Post('create/private/users/me/')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async addNewPrivateChannel(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateChannelDto,
    @Req() req,
  ) {
    return await this.dataService.addNewPrivateChannel(file, body, req.user.id);
  }

  @Post('create/public/users/me/')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async addNewPublicChannel(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePublicChannelDto,
    @Req() req,
  ) {
    // console.log('salam')
    return await this.dataService.addNewPublicChannel(file, body, req.user.id);
  }

  @Post('join/:channelId/public/users/me')
  @UseGuards(JwtAuthGuard)
  async JoinToPublicChannel(
    @Param(':channelId') channelId: number,
    @Req() req,
  ) {
    const channelUser = await this.dataService.findChannelUser(
      channelId,
      req.user.id,
    );
    return channelUser;
    // return await this.dataService.addNewUserToChannel(
    //   channelId,
    //   req.user.id,
    //   UserType.USER,
    // );
  }

  @Post('join/:channelId/private/users/me')
  @UseGuards(JwtAuthGuard)
  async JoinToPrivateChannel(
    @Param(':channelId') channelId: number,
    @Req() req,
  ) {
    return await this.dataService.validateUser(channelId, req);
  }

  @Post('add/:channelId/users/me/:id/user')
  @UseGuards(JwtAuthGuard)
  async addNewUserToChannel(
    @Param('channelId') channelId: number,
    @Param(':id') userId: number,
  ) {
    return await this.dataService.addNewUserToChannel(
      channelId,
      userId,
      UserType.USER,
    );
  }

  @Post('add/:channelId/users/me/:id/admin')
  @UseGuards(JwtAuthGuard)
  async addNewAdminToChannel(
    @Param('channelId') channelId: number,
    @Param(':id') userId: number,
  ) {
    return await this.dataService.addNewUserToChannel(
      channelId,
      userId,
      UserType.ADMIN,
    );
  }

  @Delete('leave/:channelId/users/me')
  @UseGuards(JwtAuthGuard)
  async leavesTheChannel(@Param(':channelId') channelId: number, @Req() req) {
    console.log('salam');
    return await this.dataService.leavesTheChannel(channelId, req.user.id);
  }

  @Delete('kick/:channelId/users/:userId')
  @UseGuards(JwtAuthGuard)
  async kickUserFromTheChannel(
    @Param(':channelId') channelId: number,
    @Param('userId') userId: number,
  ) {
    console.log('salam');
    return await this.dataService.leavesTheChannel(channelId, userId);
  }

  @Put('admin/:channelId/users/:userId')
  @UseGuards(JwtAuthGuard)
  async changeUserToBeAdmin(
    @Param(':channelId') channelId: number,
    @Param('userId') userId: number,
  ) {
    return await this.dataService.changeUserToBeAdminInChannel(
      channelId,
      userId,
    );
  }

  @Put('user/:channelId/users/:userId')
  @UseGuards(JwtAuthGuard)
  async changeAdminToBeUser(
    @Param(':channelId') channelId: number,
    @Param('userId') userId: number,
  ) {
    return await this.dataService.changeAdminToBeUserInChannel(
      channelId,
      userId,
    );
  }

  @Put('mute/:channelId/users/:userId')
  @UseGuards(JwtAuthGuard)
  async muteUserInTheChannel(
    @Param(':channelId') channelId: number,
    @Param('userId') userId: number,
  ) {
    return await this.dataService.muteUserInChannel(channelId, userId);
  }

  @Put('block/:channelId/users/:userId')
  @UseGuards(JwtAuthGuard)
  async blockUserInTheChannel(
    @Param(':channelId') channelId: number,
    @Param('userId') userId: number,
  ) {
    return await this.dataService.blockUserInChannel(channelId, userId);
  }
}
