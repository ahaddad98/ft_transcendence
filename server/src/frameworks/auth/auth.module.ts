import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './jwt/constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { FortyTwoStrategyStrategy } from './o-auth/42.strategy';

@Module({
    imports: [PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '500s' },
      }),],
    providers: [FortyTwoStrategyStrategy, JwtStrategy],

    exports: [JwtModule]
})
export class AuthModule {}
