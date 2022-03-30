import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ChannelUserService } from 'src/services/use-cases/channel-user/channel-user.service';

@Controller('channelUser')
export class ChannelUserController {
  constructor(private channelUserService: ChannelUserService) {}

  @Get()
  async findAllChannelsUsers() {
    return await this.channelUserService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.channelUserService.remove(id);
  }
}
