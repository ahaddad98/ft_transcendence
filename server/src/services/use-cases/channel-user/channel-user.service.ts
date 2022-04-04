import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { ChannelUser, UserType } from 'src/core/entities/channel-user.entity';
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

  // async findAllChannels(userId: number) {
  //   return await this.channelUserRepository
  //     .createQueryBuilder('channelUser')
  //     .leftJoinAndSelect('channelUser.channel', 'channel')
  //     .leftJoinAndSelect('channel.owner', 'owner')
  //     .innerJoinAndSelect('channelUser.user', 'user')
  //     // .select('DISTINCT channelUser.channel', 'channel')
  //     .where('channelUser.user.id = :id', { id: userId })
  //     .andWhere('channelUser.block = :bool', { bool: false })
  //     // .orWhere('channelUser.user.id != :id', { id: userId })
  //     .distinctOn(['channel'])
  //     .getMany();
  // }

  async findAllMyChannels(newUser: number) {
    return await this.channelUserRepository
      .createQueryBuilder('channelUser')
      .leftJoinAndSelect('channelUser.channel', 'channel')
      .innerJoinAndSelect('channel.owner', 'owner')
      .where('channelUser.user.id = :user', { user: newUser })
      // .andWhere('channelUser.ban = :bool', { bool: false })
      .orderBy('channel.createdAt', 'DESC')
      .getMany();
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
  //TODO  hadi khasni nreglha 3la 9bal time dyal ban
  async findAllChannelBlocked(newUserId: number) {
    return await this.channelUserRepository
      .createQueryBuilder('channelUser')
      .leftJoinAndSelect('channelUser.channel', 'channel')
      .innerJoinAndSelect('channelUser.user', 'user')
      .where('channelUser.user.id = :user', { user: newUserId })
      .andWhere('channelUser.ban = :bool', { bool: true })
      .getMany();
  }

  async findAllUsersInChannelWithoutMe(newChannel: Channel) {
    return await this.channelUserRepository
      .createQueryBuilder('channelUser')
      .leftJoinAndSelect('channelUser.user', 'user')
      .where('channelUser.channel.id = :channel', { channel: newChannel.id })
      .getMany();
    // console.log(salam);
  }

  async findAllUsersInChannel(newChannel: Channel, newUser: User) {
    return await this.channelUserRepository
      .createQueryBuilder('channelUser')
      .leftJoinAndSelect('channelUser.user', 'user')
      .where('channelUser.channel.id = :channel', { channel: newChannel.id })
      .andWhere('channelUser.user.id != :user', { user: newUser.id })
      .getMany();
    // console.log(salam);
  }

  async save(channelUser: ChannelUser) {
    return await this.channelUserRepository.save(channelUser);
  }

  async updateMute(id: number, channelUser: ChannelUser) {
    return await this.channelUserRepository.update(id, {
      mute: channelUser.mute,
      timeOfOperation: channelUser.timeOfOperation,
      period: channelUser.period,
    });
  }

  async updateBan(id: number, channelUser: ChannelUser) {
    return await this.channelUserRepository.update(id, {
      ban: channelUser.ban,
      timeOfOperation: channelUser.timeOfOperation,
      period: channelUser.period,
    });
  }

  async updateToBeAdmin(id: number) {
    return await this.channelUserRepository.update(id, {
      userType: UserType.ADMIN,
    });
  }

  async updateToBeUser(id: number) {
    return await this.channelUserRepository.update(id, {
      userType: UserType.USER,
    });
  }

  async removeMute(id: number) {
    return await this.channelUserRepository.update(id, {
      timeOfOperation: null,
      period: 0,
      mute: false,
    });
  }

  async remove(id: number) {
    return await this.channelUserRepository.delete(id);
  }
}
