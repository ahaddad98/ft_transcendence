import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelUser } from 'src/core/entities/channel-user.entity';
import { Channel } from 'src/core/entities/channel.entity';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelUserService {
  constructor(
    @InjectRepository(ChannelUser)
    private channelUserRepository: Repository<ChannelUser>,
  ) {}

  async findAll() {
    return await this.channelUserRepository.find({
      relations: ['user', 'channel'],
    });
  }

  async findbyChannelAndUser(newChannel: Channel, newUser: User) {
    return await this.channelUserRepository.findOne({
      where: {
        user: newUser,
        channel: newChannel,
      },
      relations: ['user', 'channel'],
    });
  }
  async findAllUsersInChannel(newChannel: Channel, newUser: User) {
    return await this.channelUserRepository
      .createQueryBuilder('channelUser')
      .leftJoinAndSelect('channelUser.user', 'user')
      .where('channelUser.channel.id = :channel', { channel: newChannel.id })
      .andWhere('channelUser.user.id != :user', { user: newUser.id })
      .getMany();
  }

  async save(channelUser: ChannelUser) {
    return await this.channelUserRepository.save(channelUser);
  }

  async remove(id: number) {
    return await this.channelUserRepository.delete(id);
  }
}
