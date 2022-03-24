import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { NotificationService } from 'src/services/use-cases/notification/notification.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private notificationService: NotificationService,
    private dataService: DataService,
  ) {}

  @Get()
  async findAllNotifications() {
    return await this.notificationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findAllMyNotifications(@Req() req) {
    console.log(req.user);
    return await this.dataService.findMyNotifications(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findNotificationsOfUser(@Param('id') id: number) {
    // console.log(req.user);
    return await this.dataService.findMyNotifications(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeNotification(@Param('id') id: number) {
    return await this.notificationService.remove(id);
  }
}
