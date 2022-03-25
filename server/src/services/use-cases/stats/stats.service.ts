import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from 'src/core/entities/stats.entity';
import { Repository} from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private statsRepository: Repository<Stats>,
  ) {}

  findAll(): Promise<Stats[]> {
<<<<<<< HEAD
    return this.statsRepository.find({relations:['user']});
=======
    return this.statsRepository.find({
      relations: ['user'],
      order: {
        level: 'DESC',
        wins: 'DESC',
      },
    });
>>>>>>> 07ab9bf81056e6a8abf44fe758780098e581a437
  }

  findTop(details: Object): Promise<Stats[]> {
    return this.statsRepository.find(details);
  }
  async findOneByIdOfUser(id: number) {
    return await this.statsRepository.findOne({ user: id });
  }

  async findOneById(id: number) {
    return await this.statsRepository.findOne(id);
  }

  async updateWins(id: number) {
    const stat: Stats = await this.findOneByIdOfUser(id);
    if (!stat) console.log('undefined');
    ++stat.xp;
    if (stat.xp === stat.xpForLevel) {
      stat.xp = 0;
      stat.xpForLevel = Math.round(stat.xpForLevel * 1.5);
      stat.level++;
    }
    await this.statsRepository.update(stat.id, {
      wins: stat.wins + 1,
      xp: stat.xp,
      xpForLevel: stat.xpForLevel,
      level: stat.level,
    });
    return stat;
  }

  async updateLoses(id: number) {
    const stat = await this.findOneByIdOfUser(id);
    console.log(stat);
    await this.statsRepository.update(stat.id, { loses: stat.loses + 1 });
  }

  save(stats: Stats): Promise<any> {
    return this.statsRepository.save(stats);
  }
}
