import { Controller, Get, Res, Req, Post, UseGuards, Param, Query } from '@nestjs/common';
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
        return res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}:3000/twofactor?id=${user.id}`)
      else{
        const token = this.dataService.login(req.user);
        this.usersService.onlineUser(req.user.id);
        return res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}:3000/loginSuccess?token=${token}`);
      }
    } catch (err) {
      return err;
    }
  }

  @Post('twoFactor')
  async TwoFactorAuthenticationVerify(@Req() req) {
    try {
      const user = await this.usersService.findOneById(req.body.id);
      let response;
      if(!user.isVerified)
      {
        response =  await this.dataService.TwoFactorAuthenticationVerify(
          req.body.id,
          req.body.token,
          );
        }
        else
        {
          response =  await this.dataService.TwoFactorAuthenticationValidate(
            req.body.id,
            req.body.token,
            );
            
          }
          console.log(response);
          if(response)
          {
            this.usersService.onlineUser(req.body.id);
            const token  = this.dataService.login({id: user.id, username: user.username});
            return {url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3000/loginSuccess?token=${token}`}
          }
          else
          return {url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}:3000/twofactor?id=${req.body.id}`}
        } catch (err) {

          console.log('error');
          return err;
        }
  }

}
