import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/core/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async addNewMessage(message: Message): Promise<Message>{
      return await this.messageRepository.save(message)
  }
  async removeMessage(id: number) {
    await this.messageRepository.delete(id);
  }
}
