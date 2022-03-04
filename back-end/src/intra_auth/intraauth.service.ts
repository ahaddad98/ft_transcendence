import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class intraauthService {
      constructor (private usersServices: UsersService, private userService: UsersService, private jwtService: JwtService) {}
      async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const {id ,name, emails } = profile
        const user = {
          email: emails[0].value,
          name: name.givenName,
          id: id,
          accessToken
        }
        this.usersServices.insert(user)
        return profile;
      }
      async login(user: any) {
        const payload = { name: user.name} ;
        return {
          acces_token: this.jwtService.sign(payload),
        }
      }
}
