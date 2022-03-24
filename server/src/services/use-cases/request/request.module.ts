import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from 'src/core/entities/request.entity';
import { RequestService } from './request.service';

@Module({
  imports:[TypeOrmModule.forFeature([Request])],
  providers: [RequestService],
  exports: [RequestService]
})
export class RequestModule {}
