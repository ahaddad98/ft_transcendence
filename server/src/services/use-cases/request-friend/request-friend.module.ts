import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestFriend } from 'src/core/entities/requestFriend.entity';
import { RequestFriendService } from './request-friend.service';

@Module({
  imports:[TypeOrmModule.forFeature([RequestFriend])],
  providers: [RequestFriendService],
  exports: [RequestFriendService]
})
export class RequestFriendModule {}
