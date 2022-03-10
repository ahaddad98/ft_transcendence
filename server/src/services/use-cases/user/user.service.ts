import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../core/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ username: id });
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findOneByIdWithRelation(id: number, relation: Object): Promise<User> {
    return await this.usersRepository.findOne(id, relation);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  save(user: User): Promise<any> {
    // console.log(user);
    return this.usersRepository.save(user);
  }
}
