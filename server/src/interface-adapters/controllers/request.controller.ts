import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { RequestParams } from 'src/services/helpers/validators';
import { RequestService } from 'src/services/use-cases/request/request.service';

@Controller('requests')
export class RequestController {
  constructor(
    private requestService: RequestService,
    private dataService: DataService,
  ) {}

  @Get()
  async getAllRequest() {
    try {
      return await this.requestService.findAll();
    } catch (err) {
                throw new UnauthorizedException();

    }
  }

  @Post('/users/me/friends/:friendId')
  @UseGuards(JwtAuthGuard)
  async sendRequestToNewFriend(@Req() req, @Param() params: RequestParams) {
    try {
      return await this.dataService.sendRequestToNewFriend(
        req.user.id,
        params.friendId,
      );
    } catch (err) {
                throw new UnauthorizedException();

    }
  }

  @Post(':id/users/me/friends/:friendId/accept')
  @UseGuards(JwtAuthGuard)
  async acceptRequestToNewFriend(@Param() params: RequestParams, @Req() req) {
    try {
      return await this.dataService.acceptRequestToNewFriend(
        params.id,
        req.user.id,
        params.friendId,
      );
    } catch (err) {
                throw new UnauthorizedException();

    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeRequest(@Param() params: RequestParams) {
    try {
      return await this.requestService.removeRequestById(params.id);
    } catch (err) {
                throw new UnauthorizedException();

    }
  }
}
