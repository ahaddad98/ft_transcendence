import { Controller, Get, Res, Req, Post, UseGuards } from '@nestjs/common';
import { FortyTwoStrategyAuthGuard } from '../../frameworks/auth/o-auth/42-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { UserService } from 'src/services/use-cases/user/user.service';

@Controller('login')
export class LoginController {
  constructor(private readonly dataService: DataService,
    private readonly usersService: UserService) {}

  @Get('intra-42')
  @UseGuards(FortyTwoStrategyAuthGuard)
  async fortyTwoStrategyStrategy(@Req() req) {}

  @Get('intra-42/redirect')
  @UseGuards(FortyTwoStrategyAuthGuard)
  async redirect(@Req() req, @Res() res) {
    try {
      const user = await this.usersService.findOneById(req.user.id);
      console.log(req.user);
      if(user.twoFactor == true)
        return res.redirect('http://localhost:3000/twofactor')
      else{
        const token = this.dataService.login(req.user);
        return res.redirect(`http://localhost:3000/loginSuccess?token=${token}`);
      }
    } catch (err) {
      return err;
    }
  }

  @Post('/twoFactor')
  @UseGuards(JwtAuthGuard)
  async TwoFactorAuthenticationVerify(@Req() req, @Res() res) {
    try {
      const user = await this.usersService.findOneById(req.user.id);
      let response;
      if(!user.isVerified)
      {
          response =  await this.dataService.TwoFactorAuthenticationVerify(
          req.user.id,
          req.body.token,
          );
        }
      else
      {
        response =  await this.dataService.TwoFactorAuthenticationValidate(
        req.user.id,
        req.body.token,
        );

      }
      if(response)
      {
        const token  = this.dataService.login({id: user.id, username: user.username});
        return res.redirect(`http://localhost:3000/loginSuccess?token=${token}`);
      }
      else
        return res.redirect('http://localhost:3000/twofactor')
    } catch (err) {
      return err;
    }
  }

}
