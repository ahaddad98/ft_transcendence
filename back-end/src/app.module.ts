import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { intraauthService } from './intra_auth/intraauth.service';
import {Strategy} from 'passport-42'
import { IntraStrategy } from './intra_auth/intra.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_ent } from './users/entity/users.entity';
import { UsersModule } from './users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { secureHeapUsed } from 'crypto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.99.125',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test_db',
      entities: [User_ent],
      synchronize: true,
    }),
    UsersModule,
     JwtModule.register({
      secret: 'SECRET',
      signOptions: {expiresIn: '60s'},
    })],
  controllers: [AppController],
  providers: [AppService, IntraStrategy,intraauthService],
  exports: [intraauthService],
})
export class AppModule {}
