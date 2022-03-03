import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      clientID: "904309942627-focg92jee85f51o08oem8kp1oi12me0e.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: 'http://localhost:3001/google/redirect',
      // scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    console.log('sahbi samir sbe3');
    
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    done(null, user);
  }
}