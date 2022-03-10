import { Controller, Get, Res, Req, Post,UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FortyTwoStrategyAuthGuard } from '../frameworks/auth/o-auth/42-auth.guard';
import { DataServicesService } from 'src/services/data-services/data-services.service';
// import { JwtAuthGuard } from '../frameworks/auth/jwt/jwt-auth.guard';
import { LocalStrategy } from '../frameworks/auth/local/local.strategy';

@Controller('login')
export class LoginController {
  constructor(private readonly dataService: DataServicesService) {}

  @Get('intra-42')
  @UseGuards(FortyTwoStrategyAuthGuard)
  async fortyTwoStrategyStrategy(@Req() req) {}

  @Get('/intra-42/redirect')
  @UseGuards(FortyTwoStrategyAuthGuard)
  redirect(@Req() req, @Res() res) {
    const token = this.dataService.login(req.user);
    return res.redirect(`http://localhost:3000/loginSuccess?token=${token}`);
  }

    @Post('local')
    @UseGuards(LocalStrategy)
    async login(@Req() req) {
      return req.user;
    }
}
