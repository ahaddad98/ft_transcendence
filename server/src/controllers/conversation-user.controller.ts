import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ConversationUserService } from 'src/services/use-cases/conversation-user/conversation-user.service';

@Controller('conversationUser')
export class ConversationUserController {
  constructor(private conversationUserService: ConversationUserService) {}
  @Get()
  async findAll() {
    return await this.conversationUserService.findAll(
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.conversationUserService.remove(id);
  }
}
