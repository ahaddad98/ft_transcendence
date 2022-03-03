import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import {Strategy} from 'passport-42'
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';


// var FortyTwoStrategy = require('passport-42').Strategy;

config();

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy) {

  constructor(private usersServices: UsersService) {
    super({
      clientID: "a0e034c0b73832047e8f6275dcb06b917599cc03566a80f9831061357a3595be",
      clientSecret: "a16cf57b9b1e6e2d18073aced634c3e41d8b66c7951596ba80f8b4361307e419",
      callbackURL: 'http://localhost:3001/42/redirect',
      // scope: ['email', 'profile'],
    });
  }
  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const {id ,name, emails } = profile
    const user = {
      email: emails[0].value,
      name: name.givenName,
      id: id,
      // lastName: name.familyName,
      // picture: photos[0].value,
      accessToken
    }
    console.log('im here');
    this.usersServices.insert(user)
    // Consolebody(@Body() user: userDto): any {
    // }
    return profile;
    // done(null, user);
  }
}