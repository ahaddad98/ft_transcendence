import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Conversation } from 'src/core/entities/conversation.entity';
import { Message } from 'src/core/entities/message.entity';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { ConversationService } from 'src/services/use-cases/conversation/conversation.service';
import { MessageService } from 'src/services/use-cases/message/message.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private messageService: MessageService,
    private conversationService: ConversationService,
  ) {}

  @Get()
  findAllMessages() {
    return this.messageService.findAll();
  }

  @Post('me/conversations/:id')
  @UseGuards(JwtAuthGuard)
  async sendNewMessage(@Req() req, @Param('id') id: number) {
    try {
      console.log(req.body);
      const conversation: Conversation =
        await this.conversationService.findConversationById(id);
      const message: Message = new Message();
      message.content = req.body.message;
      message.senderId = req.user.id;
      message.conversation = conversation;
      message.createdAt = new Date();
      this.conversationService.updateTime(conversation.id, {
        updatedAt: new Date(),
      });
      return await this.messageService.addNewMessage(message);
    } catch (err) {
      console.log(err);
    }
  }
}
