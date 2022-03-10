import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from 'src/core/entities/stats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private statsRepository: Repository<Stats>,
  ) {}

  async findOneByIdOfUser(id: number) {
    return await this.statsRepository.find({ user: id });
  }

  save(stats: Stats): Promise<any> {
    return this.statsRepository.save(stats);
  }
}
