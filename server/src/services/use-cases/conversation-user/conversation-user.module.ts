import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationUser } from 'src/core/entities/conversation-user.entity';
import { ConversationUserService } from './conversation-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationUser])],
  providers: [ConversationUserService],
  exports: [ConversationUserService],
})
export class ConversationUserModule {}
