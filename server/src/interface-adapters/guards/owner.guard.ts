import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Channel } from 'src/core/entities/channel.entity';
import { ChannelService } from 'src/services/use-cases/channel/channel.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private channelService: ChannelService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('fartita');
    const request = context.switchToHttp().getRequest();
    const channel: Channel = await this.channelService.findChannelById(
      request.params.channelId,
    );
    if (channel && channel.owner.id == request.user.id) return true;
    return false;
  }
}
