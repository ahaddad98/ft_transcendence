import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { MessageService } from 'src/services/use-cases/message/message.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private messagesServices: MessageService,
    private dataService: DataService,
  ) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async newMessage(@Req() req, @Param('id') id: number) {
    this.dataService.newMessage(req.user.id, id);
  }
}
