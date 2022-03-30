import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { channel } from 'diagnostics_channel';
import { Block } from 'src/core/entities/block.entity';
import { ChannelUser } from 'src/core/entities/channel-user.entity';
import { Channel } from 'src/core/entities/channel.entity';
import { ConversationUser } from 'src/core/entities/conversation-user.entity';
import { Conversation } from 'src/core/entities/conversation.entity';
import { Friend } from 'src/core/entities/friend.entity';
import { Message } from 'src/core/entities/message.entity';
import { Notification } from 'src/core/entities/notification.entity';
import { Request } from 'src/core/entities/request.entity';
import { User } from 'src/core/entities/user.entity';
import { AuthModule } from 'src/frameworks/auth/auth.module';
import { BlockService } from '../use-cases/block/block.service';
import { ChannelUserService } from '../use-cases/channel-user/channel-user.service';
import { ChannelService } from '../use-cases/channel/channel.service';
import { ConversationUserService } from '../use-cases/conversation-user/conversation-user.service';
import { ConversationService } from '../use-cases/conversation/conversation.service';
import { FriendService } from '../use-cases/friend/friend.service';
import { MessageService } from '../use-cases/message/message.service';
import { NotificationService } from '../use-cases/notification/notification.service';
import { RequestService } from '../use-cases/request/request.service';
import { UserService } from '../use-cases/user/user.service';
import { DataService } from './data.service';

@Module({
  imports: [
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
      Block,
    ]),
    AuthModule,
  ],
  providers: [
    DataService,
    UserService,
    FriendService,
    MessageService,
    RequestService,
    NotificationService,
    ConversationService,
    ChannelService,
    ConversationUserService,
    ChannelUserService,
    BlockService,
  ],
  exports: [DataService],
})
export class DataModule {}
