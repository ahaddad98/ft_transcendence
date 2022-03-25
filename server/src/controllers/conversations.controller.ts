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
import { User } from 'src/core/entities/user.entity';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { ConversationService } from 'src/services/use-cases/conversation/conversation.service';
import { UserService } from 'src/services/use-cases/user/user.service';

@Controller('conversations')
export class ConversationsController {
  constructor(
    private conversationService: ConversationService,
    private userService: UserService,
    private dataService: DataService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllConversations() {
    console.log('salam');
    return this.conversationService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findConversation(@Param('id') id: number) {
    return await this.conversationService.findConversationById(id);
  }

  @Get(':id/messages')
  @UseGuards(JwtAuthGuard)
  async findConversationWithMessages(@Param('id') id: number) {
    return await this.dataService.findConversationWithMessages(id);
    // return await this.conversationService.findConversationWithMessages(id);
  }

  @Get('users/me/:id')
  @UseGuards(JwtAuthGuard)
  async findConversationByUsersId(@Req() req, @Param('id') id: number) {
    try {
      return await this.conversationService.getConversationByUsers(
        req.user.id,
        id,
      );
    } catch (err) {
      console.log('la as at');
    }
  }

  @Post('users/me/:id')
  @UseGuards(JwtAuthGuard)
  async addNewConversation(@Req() req, @Param('id') userId2: number) {
    const user1 = await this.userService.findOneById(req.user.id);
    const user2 = await this.userService.findOneById(userId2);
    let conversation: Conversation = new Conversation();
    conversation.userOne = user1;
    conversation.userTwo = user2;
    return await this.conversationService.saveNewConversation(conversation);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteConversation(@Param('id') id: number) {
    await this.conversationService.remove(id);
    return { status: 201, message: 'Conversation deleted' };
  }
}
