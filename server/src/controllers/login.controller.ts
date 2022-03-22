import { Controller, Get, Res, Req, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FortyTwoStrategyAuthGuard } from '../frameworks/auth/o-auth/42-auth.guard';
import { DataService } from 'src/services/data/data.service';
// import { JwtAuthGuard } from '../frameworks/auth/jwt/jwt-auth.guard';
import { LocalStrategy } from '../frameworks/auth/local/local.strategy';
import { LocalAuthGuard } from 'src/frameworks/auth/local/local-auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly dataService: DataService) {}

  @Get('intra-42')
  @UseGuards(FortyTwoStrategyAuthGuard)
  async fortyTwoStrategyStrategy(@Req() req) {}

  @Get('/intra-42/redirect')
  @UseGuards(FortyTwoStrategyAuthGuard)
  redirect(@Req() req, @Res() res) {
    const token = this.dataService.login(req.user);
    return res.redirect(`http://localhost:3000/loginSuccess?token=${token}`);
  }
}
