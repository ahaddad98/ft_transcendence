import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from 'src/core/entities/stats.entity';
import { Repository, SubjectWithoutIdentifierError } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private statsRepository: Repository<Stats>,
  ) {}

  findAll(): Promise<Stats[]> {
    return this.statsRepository.find();
  }

  async findOneByIdOfUser(id: number) {
    return await this.statsRepository.findOne({ user: id });
  }

  async findOneById(id: number) {
    return await this.statsRepository.findOne(id);
  }

  async updateWins(id: number) {
    return await this.findOneByIdOfUser(id).then(async (data) => {
      if (!data) console.log('undefined');
      ++data.xp;
      if (data.xp === data.xpForLevel) {
        data.xp = 0;
        data.xpForLevel = Math.round(data.xpForLevel * 1.5);
        data.level++;
      }
      await this.statsRepository.update(data.id, {
        wins: data.wins + 1,
        xp: data.xp,
        xpForLevel: data.xpForLevel,
        level: data.level,
      });
      // .then((element) => console.log(element));
      return data;
    });
  }

  async updateLoses(id: number) {
    await this.findOneByIdOfUser(id).then(async (data) => {
      console.log(data);
      this.statsRepository.update(data.id, { loses: data.loses + 1 });
    });
  }

  save(stats: Stats): Promise<any> {
    return this.statsRepository.save(stats);
  }
}
