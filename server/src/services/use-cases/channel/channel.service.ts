import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/core/entities/channel.entity';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
  ) {}

  async findAll() {
    return await this.channelRepository.find();
  }

  async findChannelById(id: number) {
    return await this.channelRepository.findOne(id, {
      relations: ['conversation', 'owner'],
    });
  }
  async save(channel: Channel) {
    return await this.channelRepository.save(channel);
  }

  async delete(id: number) {
    return await this.channelRepository.delete(id);
  }

  async remove(channel: Channel) {
    return await this.channelRepository.remove(channel);
  }
}
