import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getAuthenticateOptions(context) {
    // console.log(context.args[0]);
    return context;
  }
  handleRequest(err, user, info, context) {
    console.log('salam');
    console.log(user);
    console.log(context.args[0].IncomingMessage);
    // console.log(info, context);
    return user;
  }
}
