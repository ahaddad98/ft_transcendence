import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from 'src/core/entities/block.entity';
import { ChannelUser } from 'src/core/entities/channel-user.entity';
import { Channel } from 'src/core/entities/channel.entity';
import { ConversationUser } from 'src/core/entities/conversation-user.entity';
import { Conversation } from 'src/core/entities/conversation.entity';
import { Friend } from 'src/core/entities/friend.entity';
import { Game } from 'src/core/entities/game.entity';
import { Message } from 'src/core/entities/message.entity';
import { Notification } from 'src/core/entities/notification.entity';
import { Request } from 'src/core/entities/request.entity';
import { User } from 'src/core/entities/user.entity';
import { DataService } from 'src/services/data/data.service';
import { BlockService } from 'src/services/use-cases/block/block.service';
import { ChannelUserService } from 'src/services/use-cases/channel-user/channel-user.service';
import { ChannelService } from 'src/services/use-cases/channel/channel.service';
import { ConversationUserService } from 'src/services/use-cases/conversation-user/conversation-user.service';
import { ConversationService } from 'src/services/use-cases/conversation/conversation.service';
import { FriendService } from 'src/services/use-cases/friend/friend.service';
import { GameService } from 'src/services/use-cases/game/game.service';
import { MessageService } from 'src/services/use-cases/message/message.service';
import { NotificationService } from 'src/services/use-cases/notification/notification.service';
import { RequestService } from 'src/services/use-cases/request/request.service';
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
      Message,
      Request,
      Notification,
      Conversation,
      Channel,
      ConversationUser,
      ChannelUser,
      Game,
      Block
    ]),
  ],
  providers: [
    LocalStrategy,
    FortyTwoStrategyStrategy,
    JwtStrategy,
    DataService,
    UserService,
    FriendService,
    MessageService,
    RequestService,
    NotificationService,
    ConversationService,
    ConversationUserService,
    ChannelService,
    ChannelUserService,
    GameService,
    BlockService
  ],

  exports: [JwtModule],
})
export class AuthModule {}
