import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from 'src/core/entities/block.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async findAll() {
    return await this.blockRepository.find();
  }

  async save(newBlock: Block) {
    return await this.blockRepository.save(newBlock);
  }
}
