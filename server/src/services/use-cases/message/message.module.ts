import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Conversation } from 'src/core/entities/conversation.entity';
import { Message } from 'src/core/entities/message.entity';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
