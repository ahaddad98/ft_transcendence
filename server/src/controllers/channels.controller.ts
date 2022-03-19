import {
  Body,
  Controller,
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
import { Channel, UserType } from 'src/core/entities/channel.entity';
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
  justTroling(@Param('id') id: number) {
    console.log(typeof id);
    return 'sahbi samir';
  }

  @Post('me/login')
  @UseGuards(LocalAuthGuard)
  @UseGuards(JwtAuthGuard)
  async login(@Req() req) {
    console.log('w');
    return req.user;
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async addNewChannel(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateChannelDto,
    @Req() req,
  ) {
    const user: User = await this.userService.findOneById(req.user.id);
    const channel: Channel = new Channel();
    channel.createdAt = new Date();
    channel.name = body.name;
    const hash = await bcrypt.hash(body.password, 10);
    console.log(hash);
    channel.password = hash;
    channel.avatar = file.filename;
    channel.type = UserType.ADMIN;
    channel.user = [];
    channel.user.push(user);
    return await this.channelService.save(channel);
  }
}
