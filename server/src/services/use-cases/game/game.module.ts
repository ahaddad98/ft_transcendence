import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/core/entities/game.entity';
import { User } from 'src/core/entities/user.entity';
import { UserService } from '../user/user.service';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, User])],
  providers: [GameService, UserService],
  exports: [GameService],
})
export class GameModule {}
