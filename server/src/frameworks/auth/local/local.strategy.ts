import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataService } from 'src/services/data/data.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // constructor() {
  constructor(private dataService: DataService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // const user = await this.dataService.validateUser(username, password);
    // console.log('user '+user)
    // if (!user || user === null) {
    //   // console.log('---------------------------------')
    //   throw new UnauthorizedException();
    // }
    // return user;
  }
}
