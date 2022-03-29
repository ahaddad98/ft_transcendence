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
import { RequestService } from 'src/services/use-cases/request/request.service';

@Controller('requests')
export class RequestController {
  constructor(
    private requestService: RequestService,
    private dataService: DataService,
  ) {}

  // @Get()
  // async getAllRequest() {
  //   return await this.requestService.findAll();
  // }

  @Post('/users/me/friends/:friendId')
  @UseGuards(JwtAuthGuard)
  async sendRequestToNewFriend(
    @Req() req,
    @Param('friendId') friendId: number,
  ) {
    return await this.dataService.sendRequestToNewFriend(req.user.id, friendId);
  }

  @Post(':id/users/me/friends/:friendId/accept')
  @UseGuards(JwtAuthGuard)
  async acceptRequestToNewFriend(
    @Param('id') reqId: number,
    @Req() req,
    @Param('friendId') friendId: number,
  ) {
    return await this.dataService.acceptRequestToNewFriend(
      reqId,
      req.user.id,
      friendId,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeRequest(@Param('id') id: number) {
    return await this.requestService.removeRequestById(id);
  }
}
