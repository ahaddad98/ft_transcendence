import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getAuthenticateOptions(context) {
    return context;
  }
  handleRequest(err, user, info, context) {
    return user;
  }
}
