import { Module } from '@nestjs/common';
import { intraauthService } from './intraauth.service';

@Module({
  providers: [intraauthService],
  exports: [intraauthService]

})
export class GoogleauthModule {}
