import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Conversation } from 'src/core/entities/conversation.entity';
import { Message } from 'src/core/entities/message.entity';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { ConversationService } from 'src/services/use-cases/conversation/conversation.service';
import { MessageService } from 'src/services/use-cases/message/message.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private messageService: MessageService,
    private conversationService: ConversationService,
    private dataService: DataService,
  ) {}

  @Get()
  findAllMessages() {
    return this.messageService.findAll();
  }

  @Post('users/me/conversations/:ConversationId')
  @UseGuards(JwtAuthGuard)
  async sendNewMessage(@Req() req, @Param('ConversationId') id: number) {
    try {
      return await this.dataService.sendNewMessage(req, id);
    } catch (err) {
      console.log(err);
    }
  }

  @Delete('id')
  @UseGuards(JwtAuthGuard)
  async deleteMessage(@Param('id') id: number) {
    return await this.messageService.removeMessage(id);
  }
}
