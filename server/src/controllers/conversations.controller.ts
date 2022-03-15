import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Conversation } from 'src/core/entities/conversation.entity';
import { User } from 'src/core/entities/user.entity';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { ConversationService } from 'src/services/use-cases/conversation/conversation.service';
import { UserService } from 'src/services/use-cases/user/user.service';

@Controller('conversations')
export class ConversationsController {
  constructor(
    private conversationService: ConversationService,
    private userService: UserService,
  ) {}

  @Get()
  findAllConversations() {
    console.log('salam');
    return this.conversationService.findAll();
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async addNewConversation(@Req() req, @Param('id') user2: number) {
    const users = await this.userService.findSpecificUsers({
      where: [{ id: req.user.id }, { id: user2 }],
    });
    let conversation: Conversation = new Conversation();
    conversation.user = [];
    users.map((element, index) => {
      //   console.log(element);
      element.conversation = [];
      conversation.user.push(element);
    });
    conversation = await this.conversationService.saveNewConversation(
      conversation,
    );
    return await this.userService.findSpecificUsers({
      where: [{ id: req.user.id }, { id: user2 }],
      relations: ['conversation'],
    });
  }
}
