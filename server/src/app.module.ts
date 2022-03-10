import { Module } from '@nestjs/common';
import { UserModule } from './services/use-cases/user/user.module';
import { FriendModule } from './services/use-cases/friend/friend.module';
import { DataServicesModule } from './services/data-services/data-services.module';
import { PostgresModule } from './frameworks/database/postgres/postgres.module';
import { AuthModule } from './frameworks/auth/auth.module';
import { AppController } from './controllers/app.controller';
import { LoginController } from './controllers/login.controller';
import { ProfileController } from './controllers/profile.controller';
import { RegisterController } from './controllers/register.controller';
import { UsersController } from './controllers/users.controller';
import { StatsModule } from './services/use-cases/stats/stats.module';

@Module({
  imports: [
    UserModule,
    FriendModule,
    DataServicesModule,
    PostgresModule,
    AuthModule,
    StatsModule,
  ],
  controllers: [AppController, LoginController, ProfileController, RegisterController, UsersController],
})
export class AppModule {}
