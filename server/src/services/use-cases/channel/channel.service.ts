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
  // async findAll() {
  //   return await this.channelRepository.find();
  // }

  async findAllChannels() {
    return await this.channelRepository.find({
      relations: ['owner'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findChannelByConversationId(conversationId: number) {
    return await this.channelRepository.findOne({
      relations: ['conversation'],
      where: {
        conversation: {
          id: conversationId,
        },
      },
    });
  }

  async updatePassowrd(id: number, newPassword: string) {
    return await this.channelRepository.update(id, { password: newPassword });
  }

  async updateNumberOfMembers(id: number, newMembers: number) {
    return await this.channelRepository.update(id, { members: newMembers });
  }
  async searchForOwner(user: User) {
    const channel = await this.channelRepository.findOne({
      relations: ['owner'],
      where: {
        owner: user,
      },
    });
    if (!channel) return false;
    return true;
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
