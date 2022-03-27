import { Module } from '@nestjs/common';
import { UserModule } from './services/use-cases/user/user.module';
import { FriendModule } from './services/use-cases/friend/friend.module';
import { DataModule } from './services/data/data.module';
import { PostgresModule } from './frameworks/database/postgres/postgres.module';
import { AuthModule } from './frameworks/auth/auth.module';
import { AppController } from './controllers/app.controller';
import { LoginController } from './controllers/login.controller';
import { ProfileController } from './controllers/profile.controller';
import { UsersController } from './controllers/users.controller';
import { ConversationsController } from './controllers/conversations.controller';
import { ConversationModule } from './services/use-cases/conversation/conversation.module';
import { MessagesController } from './controllers/messages.controller';
import { MessageModule } from './services/use-cases/message/message.module';
import { ChannelsController } from './controllers/channels.controller';
import { ChannelModule } from './services/use-cases/channel/channel.module';
import { FriendsController } from './controllers/friends.controller';
import { RequestModule } from './services/use-cases/request/request.module';
import { RequestController } from './controllers/request.controller';
import { NotificationModule } from './services/use-cases/notification/notification.module';
import { NotificationsController } from './controllers/notifications.controller';
import { ConversationUserModule } from './services/use-cases/conversation-user/conversation-user.module';
import { ConversationUserController } from './controllers/conversation-user.controller';
import { ChannelUserModule } from './services/use-cases/channel-user/channel-user.module';
import { ChannelUserController } from './controllers/channel-user.controller';
import { GameController } from './controllers/game.controller';
import { GameModule } from './services/use-cases/game/game.module';

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
  ],
})
export class AppModule {}
