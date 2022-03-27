import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-42';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { DataService } from 'src/services/data/data.service';
import { User } from 'src/core/entities/user.entity';

config();
@Injectable()
export class FortyTwoStrategyStrategy extends PassportStrategy(Strategy) {
  constructor(private dataService: DataService) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: VerifyCallback,
  ): Promise<any> {
    // console.log(profile);
    const user: User = {
      id: profile._json.id,
      avatar: profile._json.image_url,
      username: profile._json.login,
      email: profile._json.email,
      friend: [],
    };
    this.dataService.save(user);
    return user;
  }
}
