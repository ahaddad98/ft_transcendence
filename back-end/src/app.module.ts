import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './googleauth/google.strategy'
import { GoogleauthService } from './googleauth/googleauth.service';
import { intraauthService } from './intra_auth/intraauth.service';
import {Strategy} from 'passport-42'
import { IntraStrategy } from './intra_auth/intra.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_ent } from './users/entity/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.99.116',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test_db',
      entities: [User_ent],
      synchronize: true,
    }),
    UsersModule,
    GoogleauthService, intraauthService],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, GoogleauthService, IntraStrategy,intraauthService],
  // exports: [GoogleauthService],
})
export class AppModule {}
