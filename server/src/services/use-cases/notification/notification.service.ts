import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/core/entities/notification.entity';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async findAll() {
    return await this.notificationRepository.find({
      relations: ['user', 'sender'],
    });
  }

  async findNotificationById(id: number) {
    return await this.notificationRepository.findOne(id, {
      relations: ['user', 'sender'],
    });
  }

  async findMyNotifications(newUser: User) {
    return await this.notificationRepository.find({
      where: { user: newUser },
      relations: ['user', 'sender'],
    });
  }
  async sendNotificationForRequest(notification: Notification) {
    return await this.notificationRepository.save(notification);
  }

  async remove(id: number) {
    return await this.notificationRepository.delete(id);
  }
}
