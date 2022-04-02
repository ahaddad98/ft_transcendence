import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { MessageParams } from 'src/services/helpers/validators';
import { MessageService } from 'src/services/use-cases/message/message.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private messageService: MessageService,
    private dataService: DataService,
  ) {}

  @Get()
  findAllMessages() {
    try {
      return this.messageService.findAll();
    } catch (err) {
      return err;
    }
  }

  @Get('conversations/:conversationId/users/me')
  @UseGuards(JwtAuthGuard)
  async getallMessageOfoneOfmyConversations(@Param() params: MessageParams) {
    try {
      return await this.dataService.getallMessageOfoneOfmyConversations(
        params.conversationId,
      );
    } catch (err) {
      return err;
    }
  }

  @Post('conversations/:conversationId/users/me')
  @UseGuards(JwtAuthGuard)
  async sendNewMessage(@Req() req, @Param() params: MessageParams) {
    try {
      console.log(req.body.message);
      return await this.dataService.sendNewMessage(req, params.conversationId);
    } catch (err) {
      return err;
    }
  }

  // @Put('update/hidden')
  // @UseGuards(JwtAuthGuard)
  // async updateHiddenToBeTrue() {
  //   // return await this.messageService.updateHiddenToBeTrue();
  // }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteMessage(@Param() params: MessageParams) {
    try {
      return await this.messageService.removeMessage(params.id);
    } catch (err) {
      return err;
    }
  }
}
