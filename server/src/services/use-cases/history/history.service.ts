import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History, ResultType } from 'src/core/entities/history.entity';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  findAll(): Promise<History[]> {
    return this.historyRepository.find({relations: ['user', 'enemy']});
  }

  async findHistoriesByResult(result: string) {
    return await this.historyRepository.find({
      where: {
        result: result,
      },
      relations: ['user', 'enemy'],
    });
  }

  async findByUserId(id: number) {
    return this.historyRepository.findOne(id);
  }
  findByUser(newUser: User): Promise<History[]> {
    return this.historyRepository.find({ user: newUser });
  }

  async addNewWin(userId1: number, userId2: number) {}

  async addNewResult(history: History) {
    return await this.historyRepository.save(history);
  }

}
