import { Module } from '@nestjs/common';
import { GoogleauthService } from './googleauth.service';

@Module({
  providers: [GoogleauthService],
  exports: [GoogleauthService]

})
export class GoogleauthModule {}
