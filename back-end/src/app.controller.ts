import { Controller, Get, Req, UseGuards , Body} from '@nestjs/common';
import { GoogleauthService } from './googleauth/googleauth.service';
import { AuthGuard } from '@nestjs/passport';
import { intraauthService } from './intra_auth/intraauth.service';
import { reduce } from 'rxjs';
import { userDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersServices: UsersService,private readonly googleauthService: GoogleauthService) {}

  @Get()
  @UseGuards(AuthGuard('42'))
  async IntraAuth(@Req() req) {
    // return 'amine samir';
  }

  @Get('/42/redirect')
  @UseGuards(AuthGuard('42'))
  intraAuthRedirect(@Req() req) {
    return req.user;
  }
  // @Get()
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) {}

  // @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   return this.googleauthService.googleLogin(req)
  // }
}
