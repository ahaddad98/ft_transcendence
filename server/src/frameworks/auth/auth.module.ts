import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/core/entities/conversation.entity';
import { Friend } from 'src/core/entities/friend.entity';
import { History } from 'src/core/entities/history.entity';
import { Message } from 'src/core/entities/message.entity';
import { Notification } from 'src/core/entities/notification.entity';
import { Request } from 'src/core/entities/request.entity';
import { Stats } from 'src/core/entities/stats.entity';
import { User } from 'src/core/entities/user.entity';
import { DataService } from 'src/services/data/data.service';
import { ConversationService } from 'src/services/use-cases/conversation/conversation.service';
import { FriendService } from 'src/services/use-cases/friend/friend.service';
import { HistoryService } from 'src/services/use-cases/history/history.service';
import { MessageService } from 'src/services/use-cases/message/message.service';
import { NotificationService } from 'src/services/use-cases/notification/notification.service';
import { RequestService } from 'src/services/use-cases/request/request.service';
import { StatsService } from 'src/services/use-cases/stats/stats.service';
import { UserService } from 'src/services/use-cases/user/user.service';
import { jwtConstants } from './jwt/constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { FortyTwoStrategyStrategy } from './o-auth/42.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([
      User,
      Friend,
      Stats,
      History,
      Message,
      Request,
      Notification,
      Conversation,
    ]),
  ],
  providers: [
    LocalStrategy,
    FortyTwoStrategyStrategy,
    JwtStrategy,
    DataService,
    UserService,
    StatsService,
    FriendService,
    MessageService,
    HistoryService,
    RequestService,
    NotificationService,
    ConversationService,
  ],

  exports: [JwtModule],
})
export class AuthModule {}
