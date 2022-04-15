import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { ConversationUserService } from 'src/services/use-cases/conversation-user/conversation-user.service';

@Controller('conversationUser')
export class ConversationUserController {
  constructor(private conversationUserService: ConversationUserService) {}
  @Get()
  async findAll() {
    return await this.conversationUserService.findAll();
  }

  @Get('conversations/:id/users/me/all')
  @UseGuards(JwtAuthGuard)
  async findUsersOfConversations(@Param('id') id: number) {
    return await this.conversationUserService.findUsersOfConversations(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.conversationUserService.delete(id);
  }
}
