import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getAuthenticateOptions(context) {
    context.args[0].body.username = context.args[0].user.username;
    return context;
  }
  //   handleRequest(err, user, info, context) {
  //     console.log('salam');
  //     // console.log(info, context);
  //     return user;
  //   }
}
