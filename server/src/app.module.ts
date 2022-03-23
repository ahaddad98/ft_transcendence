import { Module } from '@nestjs/common';
import { UserModule } from './services/use-cases/user/user.module';
import { FriendModule } from './services/use-cases/friend/friend.module';
import { DataModule } from './services/data/data.module';
import { PostgresModule } from './frameworks/database/postgres/postgres.module';
import { AuthModule } from './frameworks/auth/auth.module';
import { AppController } from './controllers/app.controller';
import { LoginController } from './controllers/login.controller';
import { ProfileController } from './controllers/profile.controller';
import { RegisterController } from './controllers/register.controller';
import { UsersController } from './controllers/users.controller';
import { StatsModule } from './services/use-cases/stats/stats.module';
import { StatsController } from './controllers/stats.controller';
import { ConversationsController } from './controllers/conversations.controller';
import { ConversationModule } from './services/use-cases/conversation/conversation.module';
import { MessagesController } from './controllers/messages.controller';
import { MessageModule } from './services/use-cases/message/message.module';
import { ChannelsController } from './controllers/channels.controller';
import { ChannelModule } from './services/use-cases/channel/channel.module';
import { HistoryController } from './controllers/history.controller';
import { HistoryModule } from './services/use-cases/history/history.module';
import { FriendsController } from './controllers/friends.controller';
import { RequestFriendModule } from './services/use-cases/request-friend/request-friend.module';
import { RequestFriendController } from './controllers/request.controller';

@Module({
  imports: [
    UserModule,
    FriendModule,
    DataModule,
    PostgresModule,
    AuthModule,
    StatsModule,
    HistoryModule,
    ConversationModule,
    MessageModule,
    ChannelModule,
    RequestFriendModule,
  ],
  controllers: [
    AppController,
    LoginController,
    ProfileController,
    UsersController,
    StatsController,
    ConversationsController,
    MessagesController,
    ChannelsController,
    FriendsController,
    HistoryController,
    RequestFriendController,
  ],
})
export class AppModule {}
