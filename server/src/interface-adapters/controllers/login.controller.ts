import { Controller, Get, Res, Req, Post, UseGuards } from '@nestjs/common';
import { FortyTwoStrategyAuthGuard } from '../../frameworks/auth/o-auth/42-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly dataService: DataService) {}

  @Get('intra-42')
  @UseGuards(FortyTwoStrategyAuthGuard)
  async fortyTwoStrategyStrategy(@Req() req) {}

  @Get('intra-42/redirect')
  @UseGuards(FortyTwoStrategyAuthGuard)
  redirect(@Req() req, @Res() res) {
    try {
      const token = this.dataService.login(req.user);
      return res.redirect(`http://localhost:3000/loginSuccess?token=${token}`);
    } catch (err) {
      return err;
    }
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async TwoFactorAuthenticationRegister(@Req() req) {
    try {
      return await this.dataService.TwoFactorAuthenticationRegister(
        req.user.id,
      );
    } catch (err) {
      return err;
    }
  }

  @Post('/verify')
  @UseGuards(JwtAuthGuard)
  async TwoFactorAuthenticationVerify(@Req() req) {
    try {
      return await this.dataService.TwoFactorAuthenticationVerify(
        req.user.id,
        req.body.token,
      );
    } catch (err) {
      return err;
    }
  }

  @Post('/validate')
  @UseGuards(JwtAuthGuard)
  async TwoFactorAuthenticationValidate(@Req() req) {
    try {
      return await this.dataService.TwoFactorAuthenticationValidate(
        req.user.id,
        req.body.token,
      );
    } catch (err) {
      return err;
    }
  }
}
