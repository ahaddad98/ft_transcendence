import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ChannelUser, UserType } from 'src/core/entities/channel-user.entity';
import { Channel } from 'src/core/entities/channel.entity';
import { User } from 'src/core/entities/user.entity';
import { ChannelUserService } from 'src/services/use-cases/channel-user/channel-user.service';
import { ChannelService } from 'src/services/use-cases/channel/channel.service';
import { UserService } from 'src/services/use-cases/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private channelService: ChannelService,
    private channelUserService: ChannelUserService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const channel: Channel = await this.channelService.findChannelById(
      request.params.id,
    );
    if (channel && channel.owner.id == request.user.id) return true;
    const me: User = await this.userService.findOneById(request.user.id);
    const channelUser: ChannelUser =
      await this.channelUserService.findbyChannelAndUser(channel, me);
    if (channelUser && channelUser.userType == UserType.ADMIN) {
      const user: User = await this.userService.findOneById(
        request.params.userId,
      );
      const userType: ChannelUser =
        await this.channelUserService.findbyChannelAndUser(channel, user);
      if (userType && userType.userType == UserType.USER) {
        return true;
      }
    }
    return false;
  }
}
