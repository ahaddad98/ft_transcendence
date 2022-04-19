import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  CreateChannelDto,
  CreatePublicChannelDto,
} from 'src/core/dtos/channel.dto';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { ChannelService } from 'src/services/use-cases/channel/channel.service';
import { DataService } from 'src/services/data/data.service';
import { OwnerGuard } from '../guards/owner.guard';
import { AdminGuard } from '../guards/admin.guard';
import {
  ChannelParams,
  UpdatePasswordChannel,
} from 'src/services/helpers/validators';

@Controller('channels')
export class ChannelsController {
  constructor(
    private channelService: ChannelService,
    private dataService: DataService,
  ) {}

  @Get()
  async findChannels() {
    return await this.channelService.findAll();
  }

  @Get('home') //
  @UseGuards(JwtAuthGuard)
  async findAllChannels(@Req() req) {
    try {
      return await this.dataService.findAllChannels(req.user.id, req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Get('users/me') //
  @UseGuards(JwtAuthGuard)
  async findAllMyChannels(@Req() req) {
    try {
      return await this.dataService.findAllMyChannels(req.user.id);
    } catch (err) {
      return err;
    }
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findChannelById(@Param() params: ChannelParams, @Req() req) {
    try {
      return await this.dataService.findMyChannel(params.id, req.user.id);
    } catch (err) {
      throw new UnauthorizedException();
      return err;
    }
  }
  
  @Get(':id/users/all')
  @UseGuards(JwtAuthGuard)
  async listAllUsersOfChannelWithoutMe(@Param() params: ChannelParams) {
    try {
      console.log('@Get(:id/users/all)')
      return await this.dataService.listUsersOfChannelWitouhtMe(params.id);
    } catch (err) {
      // console.log('waaaa errrorr')
      throw new Error();
    }
  }

  @Get(':id/users/me/all')
  @UseGuards(JwtAuthGuard)
  async listAllUsersOfChannel(@Param() params: ChannelParams, @Req() req) {
    try {
      return await this.dataService.listUsersOfChannel(params.id, req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  async deleteChannel(@Param() params: ChannelParams) {
    try {
      return await this.dataService.removeChannel(params.id);
    } catch (err) {
      return err;
    }
  }

  @Post('create/private/users/me/')
  @UseGuards(JwtAuthGuard)
  async addNewPrivateChannel(@Body() body: CreateChannelDto, @Req() req) {
    try {
      return await this.dataService.addNewPrivateChannel(body, req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Put('update/:id/password/users/me/')
  @UseGuards(OwnerGuard)
  @UseGuards(JwtAuthGuard)
  async updatePasswordChannel(
    @Param() params: ChannelParams,
    @Body() body: UpdatePasswordChannel,
    @Req() req,
  ) {
    try {
      return await this.dataService.UpdateChannelPassword(
        params.id,
        body,
        req.user.id,
      );
    } catch (err) {
      return err;
    }
  }

  @Post('create/public/users/me/')
  @UseGuards(JwtAuthGuard)
  async addNewPublicChannel(@Body() body: CreatePublicChannelDto, @Req() req) {
    try {
      return await this.dataService.addNewPublicChannel(body, req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Post('join/:id/public/users/me')
  @UseGuards(JwtAuthGuard)
  async JoinToPublicChannel(@Param() params: ChannelParams, @Req() req) {
    try {
      console.log('join/:id/public/users/me');
      return await this.dataService.joinPublicChannel(params.id, req.user.id);
    } catch (err) {
      console.log('error in join/:id/public/users/me');
      return err;
    }
  }

  @Post('join/:id/private/users/me')
  @UseGuards(JwtAuthGuard)
  async JoinToPrivateChannel(
    @Param() params: ChannelParams,
    @Body() body: UpdatePasswordChannel,
    @Req() req,
  ) {
    try {
      return await this.dataService.joinPrivateChannel(
        params.id,
        body,
        req.user.id,
      );
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  @Delete('leave/:id/users/me')
  @UseGuards(JwtAuthGuard)
  async leavesTheChannel(@Param() params: ChannelParams, @Req() req) {
    try {
      return await this.dataService.leavesTheChannel(params.id, req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Delete('kick/:id/users/:userId')
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  async kickUserFromTheChannel(@Param() params: ChannelParams) {
    try {
      return await this.dataService.leavesTheChannel(params.id, params.userId);
    } catch (err) {
      return err;
    }
  }

  @Put('admin/:id/users/:userId')
  @UseGuards(OwnerGuard)
  @UseGuards(JwtAuthGuard)
  async changeUserToBeAdmin(@Param() params: ChannelParams) {
    try {
      return await this.dataService.changeUserToBeAdminInChannel(
        params.id,
        params.userId,
      );
    } catch (err) {
      return err;
    }
  }

  @Put('user/:id/users/:userId')
  @UseGuards(OwnerGuard)
  @UseGuards(JwtAuthGuard)
  async changeAdminToBeUser(@Param() params: ChannelParams) {
    try {
      return await this.dataService.changeAdminToBeUserInChannel(
        params.id,
        params.userId,
      );
    } catch (err) {
      return err;
    }
  }

  @Put('mute/:id/users/:userId')
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  async muteUserInTheChannel(@Req() req, @Param() params: ChannelParams) {
    try {
      return await this.dataService.muteUserInChannel(
        params.id,
        params.userId,
        req.body,
      );
    } catch (err) {
      return err;
    }
  }

  @Put('ban/:id/users/:userId')
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  async banUserInTheChannel(@Req() req, @Param() params: ChannelParams) {
    try {
      return await this.dataService.banUserInChannel(
        params.id,
        params.userId,
        req.body,
      );
    } catch (err) {
      return err;
    }
  }

  @Delete('remove/ban/:id/users/:userId')
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  async removeBanUserInTheChannel(@Param() params: ChannelParams) {
    try {
      return await this.dataService.removeBanUserInChannel(
        params.id,
        params.userId,
      );
    } catch (err) {
      return err;
    }
  }

  @Delete('remove/mute/:id/users/:userId')
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  async removeMuteUserInTheChannel(@Param() params: ChannelParams) {
    try {
      return await this.dataService.removeMuteUserInChannel(
        params.id,
        params.userId,
      );
    } catch (err) {
      return err;
    }
  }
}
