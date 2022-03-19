import { Controller, Get } from '@nestjs/common';
import { ChannelService } from 'src/services/use-cases/channel/channel.service';

@Controller('channels')
export class ChannelsController {
  constructor(private channelService: ChannelService) {}

  @Get()
  async findAllChannels()
  {
    return await this.channelService.findAll();
  }
}
