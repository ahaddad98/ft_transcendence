import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateChannelDto } from 'src/core/dtos/channel.dto';
import { Channel } from 'src/core/entities/channel.entity';
import { User } from 'src/core/entities/user.entity';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { saveImageToStorage } from 'src/services/helpers/image-storage';
import { ChannelService } from 'src/services/use-cases/channel/channel.service';
import { UserService } from 'src/services/use-cases/user/user.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/frameworks/auth/local/local-auth.guard';

@Controller('channels')
export class ChannelsController {
  constructor(
    private channelService: ChannelService,
    private userService: UserService,
  ) {}

  @Get()
  async findAllChannels() {
    return await this.channelService.findAll();
  }

  @Get(':id')
  async findChannelById(@Param('id') id: number) {
    return await this.channelService.findChannelById(id);
  }

  @Post(':id/login')
  @UseGuards(LocalAuthGuard)
  @UseGuards(JwtAuthGuard)
  async login(@Req() req) {
    console.log('w');
    return req.user;
  }

  @Delete(':id')
  async deleteChannel(@Param('id') id: number) {
    await this.channelService.remove(id);
    return { status: 200, message: 'channel is removed' };
  }

  @Post('create/users/me/')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async addNewChannel(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateChannelDto,
    @Req() req,
    ) {
      return await this.addNewChannel(file, body, req.user.id);
    }
    
    @Post('add/:channelId/users/me/:id')
    @UseGuards(JwtAuthGuard) // TODO hadi khasni 
    async addNewUserToChannel(@Param('channelId') channelId: number, @Param(':id') UserId: number){
      return await this.addNewUserToChannel
    }
}
