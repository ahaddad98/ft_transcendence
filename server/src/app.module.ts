import { Module } from '@nestjs/common';
import { UserModule } from './services/use-cases/user/user.module';
import { FriendModule } from './services/use-cases/friend/friend.module';
import { DataModule } from './services/data/data.module';
import { PostgresModule } from './frameworks/database/postgres/postgres.module';
import { AuthModule } from './frameworks/auth/auth.module';
import { AppController } from './interface-adapters/controllers/app.controller';
import { LoginController } from './interface-adapters/controllers/login.controller';
import { ProfileController } from './interface-adapters/controllers/profile.controller';
import { UsersController } from './interface-adapters/controllers/users.controller';
import { ConversationsController } from './interface-adapters/controllers/conversations.controller';
import { ConversationModule } from './services/use-cases/conversation/conversation.module';
import { MessagesController } from './interface-adapters/controllers/messages.controller';
import { MessageModule } from './services/use-cases/message/message.module';
import { ChannelsController } from './interface-adapters/controllers/channels.controller';
import { ChannelModule } from './services/use-cases/channel/channel.module';
import { FriendsController } from './interface-adapters/controllers/friends.controller';
import { RequestModule } from './services/use-cases/request/request.module';
import { RequestController } from './interface-adapters/controllers/request.controller';
import { NotificationModule } from './services/use-cases/notification/notification.module';
import { NotificationsController } from './interface-adapters/controllers/notifications.controller';
import { ConversationUserModule } from './services/use-cases/conversation-user/conversation-user.module';
import { ConversationUserController } from './interface-adapters/controllers/conversation-user.controller';
import { ChannelUserModule } from './services/use-cases/channel-user/channel-user.module';
import { ChannelUserController } from './interface-adapters/controllers/channel-user.controller';
import { GameController } from './interface-adapters/controllers/game.controller';
import { GameModule } from './services/use-cases/game/game.module';
import { BlockModule } from './services/use-cases/block/block.module';
import { BlockController } from './interface-adapters/controllers/block.controller';
import { AppGateway } from './app.gateway';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    UserModule,
    FriendModule,
    DataModule,
    PostgresModule,
    AuthModule,
    ConversationModule,
    MessageModule,
    ChannelModule,
    RequestModule,
    NotificationModule,
    ConversationUserModule,
    ChannelUserModule,
    ChannelUserModule,
    GameModule,
    BlockModule,
  ],
  controllers: [
    AppController,
    LoginController,
    ProfileController,
    UsersController,
    ConversationsController,
    MessagesController,
    ChannelsController,
    FriendsController,
    RequestController,
    NotificationsController,
    ConversationUserController,
    ChannelUserController,
    GameController,
    BlockController,
  ],
  providers: [AppGateway, ChatGateway],
})
export class AppModule {}
