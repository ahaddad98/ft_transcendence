import { Controller, Get, Req, UseGuards , Body} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { intraauthService } from './intra_auth/intraauth.service';
import { reduce } from 'rxjs';
import { userDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly intraauthservice: intraauthService) {}

  @Get()
  @UseGuards(AuthGuard('42'))
  async IntraAuth(@Req() req) {
  }

  @Get('/42/redirect')
  @UseGuards(AuthGuard('42'))
  intraAuthRedirect(@Req() req) {
    // return this.intraauthservice.login(req.userDto);
    return req.user;
  }
}
