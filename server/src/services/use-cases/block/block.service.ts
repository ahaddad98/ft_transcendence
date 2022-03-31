import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from 'src/core/entities/block.entity';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async findAll() {
    return await this.blockRepository.find({ relations: ['user', 'block'] });
  }

  async findMyBlockList(myId: number) {
    return await this.blockRepository.find({
      relations: ['user', 'block'],
      where: {
        user: {
          id: myId,
        },
      },
    });
  }

  async findAllMyBlockList(myId: number) {
    return await this.blockRepository.find({
      relations: ['user', 'block'],
      where: [
        {
          user: {
            id: myId,
          },
        },
        {
          block: { id: myId },
        },
      ],
    });
  }
  
  async findBlockUser(me: User, user: User) {
    return await this.blockRepository.findOne({
      relations: ['user', 'block'],
      where: {
        user: {
          id: me.id,
        },
        block: {
          id: user.id,
        },
      },
    });
  }
  async save(newBlock: Block) {
    return await this.blockRepository.save(newBlock);
  }

  async delete(id: number) {
    return await this.blockRepository.delete(id);
  }

  async remove(block: Block) {
    return await this.blockRepository.remove(block);
  }
}
