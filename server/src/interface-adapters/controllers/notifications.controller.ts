import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { NotificationParams } from 'src/services/helpers/validators';
import { NotificationService } from 'src/services/use-cases/notification/notification.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private notificationService: NotificationService,
    private dataService: DataService,
  ) {}

  @Get()
  async findAllNotifications() {
    try {
      return await this.notificationService.findAll();
    } catch (err) {
      return err;
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findAllMyNotifications(@Req() req) {
    try {
      return await this.dataService.findMyNotifications(req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findNotificationsOfUser(@Param() params: NotificationParams) {
    try {
      return await this.dataService.findMyNotifications(params.id);
    } catch (err) {
      return err;
    }
  }

  @Get('requests/users/me')
  @UseGuards(JwtAuthGuard)
  async findMyRequestsNotifications(@Req() req) {
    try {
      return await this.dataService.findMyRequestsNotifications(req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Get('conversations/users/me')
  @UseGuards(JwtAuthGuard)
  async findMyConversationsNotifications(@Req() req) {
    try {
      return await this.dataService.findMyConversationsNotifications(
        req.user.id,
      );
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeNotification(@Param() params: NotificationParams) {
    try {
      return await this.notificationService.remove(params.id);
    } catch (err) {
      return err;
    }
  }
}
