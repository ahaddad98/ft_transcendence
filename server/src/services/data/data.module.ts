import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/core/entities/friend.entity';
import { Stats } from 'src/core/entities/stats.entity';
import { User } from 'src/core/entities/user.entity';
import { AuthModule } from 'src/frameworks/auth/auth.module';
import { JwtStrategy } from 'src/frameworks/auth/jwt/jwt.strategy';
import { FriendService } from '../use-cases/friend/friend.service';
import { StatsService } from '../use-cases/stats/stats.service';
import { UserService } from '../use-cases/user/user.service';
import { DataService } from './data.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friend, Stats]), AuthModule],
  providers: [DataService, UserService, FriendService, StatsService],
  exports: [DataService],
})
export class DataModule {}
