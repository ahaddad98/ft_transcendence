import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateChannelDto, CreatePublicChannelDto } from 'src/core/dtos/channel.dto';
import { Channel } from 'src/core/entities/channel.entity';
import { User } from 'src/core/entities/user.entity';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { saveImageToStorage } from 'src/services/helpers/image-storage';
import { ChannelService } from 'src/services/use-cases/channel/channel.service';
import { UserService } from 'src/services/use-cases/user/user.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/frameworks/auth/local/local-auth.guard';
import { DataService } from 'src/services/data/data.service';

@Controller('channels')
export class ChannelsController {
  constructor(
    private channelService: ChannelService,
    private userService: UserService,
    private dataService: DataService,
  ) {}

  @Get()
  async findAllChannels() {
    return await this.channelService.findAll();
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
    return await this.dataService.addNewUserToChannel(channelId, req.user.id);
  }

  @Post('join/:channelId/private/users/me')
  @UseGuards(JwtAuthGuard)
  async JoinToPrivateChannel(
    @Param(':channelId') channelId: number,
    @Req() req,
  ) {
    return await this.dataService.validateUser(channelId, req);
  }

  @Post('add/:channelId/users/me/:id')
  @UseGuards(JwtAuthGuard)
  async addNewUserToChannel(
    @Param('channelId') channelId: number,
    @Param(':id') userId: number,
  ) {
    return await this.dataService.addNewUserToChannel(channelId, userId);
  }

  @Post('add/:channelId/admin/users/:id')
  @UseGuards(JwtAuthGuard)
  async addUserToBeAdmin(
    @Param('channelId') channelId: number,
    @Param(':id') userId: number,
  ) {
    return await this.dataService.addUserToBeAdminInChannel(channelId, userId);
    // return await
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
}
