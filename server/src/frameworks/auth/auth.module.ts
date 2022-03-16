import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/core/entities/friend.entity';
import { History } from 'src/core/entities/history.entity';
import { Stats } from 'src/core/entities/stats.entity';
import { User } from 'src/core/entities/user.entity';
import { DataModule } from 'src/services/data/data.module';
import { DataService } from 'src/services/data/data.service';
import { FriendService } from 'src/services/use-cases/friend/friend.service';
import { HistoryService } from 'src/services/use-cases/history/history.service';
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
    TypeOrmModule.forFeature([User, Friend, Stats, History]),
  ],
  providers: [
    LocalStrategy,
    FortyTwoStrategyStrategy,
    JwtStrategy,
    DataService,
    UserService,
    StatsService,
    FriendService,
    HistoryService
  ],

  exports: [JwtModule],
})
export class AuthModule {}
