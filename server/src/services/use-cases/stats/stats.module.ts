import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from 'src/core/entities/stats.entity';
import { StatsService } from './stats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stats])],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
