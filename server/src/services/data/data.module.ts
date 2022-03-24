import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/core/entities/friend.entity';
import { History } from 'src/core/entities/history.entity';
import { Message } from 'src/core/entities/message.entity';
import { Notification } from 'src/core/entities/notification.entity';
import { Request } from 'src/core/entities/request.entity';
import { Stats } from 'src/core/entities/stats.entity';
import { User } from 'src/core/entities/user.entity';
import { AuthModule } from 'src/frameworks/auth/auth.module';
import { JwtStrategy } from 'src/frameworks/auth/jwt/jwt.strategy';
import { FriendService } from '../use-cases/friend/friend.service';
import { HistoryService } from '../use-cases/history/history.service';
import { MessageService } from '../use-cases/message/message.service';
import { NotificationService } from '../use-cases/notification/notification.service';
import { RequestService } from '../use-cases/request/request.service';
import { StatsService } from '../use-cases/stats/stats.service';
import { UserService } from '../use-cases/user/user.service';
import { DataService } from './data.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Friend,
      Stats,
      History,
      Message,
      Request,
      Notification,
    ]),
    AuthModule,
  ],
  providers: [
    DataService,
    UserService,
    FriendService,
    StatsService,
    HistoryService,
    MessageService,
    RequestService,
    NotificationService,
  ],
  exports: [DataService],
})
export class DataModule {}
