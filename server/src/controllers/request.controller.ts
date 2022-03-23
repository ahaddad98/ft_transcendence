import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { RequestFriendService } from 'src/services/use-cases/request-friend/request-friend.service';

@Controller('request')
export class RequestFriendController {
  constructor(
    private requestFriendService: RequestFriendService,
    private dataService: DataService,
  ) {}

  @Get()
  async getAllRequest() {
    return await this.requestFriendService.findAll();
  }

  @Post('me/friends/:friendId')
  @UseGuards(JwtAuthGuard)
  async sendRequestToNewFriend(
    @Req() req,
    @Param('friendId') friendId: number,
  ) {
    return await this.dataService.sendRequestToNewFriend(req.user.id, friendId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeRequest(@Param('id') id: number) {
    return await this.requestFriendService.removeRequestById(id);
  }

  // just for testing
  @Post(':friendId/friends/me')
  @UseGuards(JwtAuthGuard)
  async sendRequestToNewFriend1(
    @Req() req,
    @Param('friendId') friendId: number,
  ) {
    return await this.dataService.sendRequestToNewFriend(friendId, req.user.id);
  }
}
