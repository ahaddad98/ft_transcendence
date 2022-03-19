import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/core/entities/history.entity';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  findAll(): Promise<History[]> {
    return this.historyRepository.find();
  }

  async findByUserId(id: number) {
    return this.historyRepository.findOne(id);
  }
  findByUser(newUser: User): Promise<History[]> {
    return this.historyRepository.find({ user: newUser });
  }

  async addNewStat(user: User, win: boolean, PlayerTwo: number) {
    // const salt
    const history: History = new History();
    history.enemyId = PlayerTwo;
    history.user = user;
    history.win = win;
    return this.historyRepository.save(history);
  }
}
