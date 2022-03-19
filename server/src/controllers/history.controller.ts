import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { HistoryService } from 'src/services/use-cases/history/history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  async findAllHistories() {
    return await this.historyService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findHistoryByUserId(@Req() req) {
    return await this.historyService.findByUserId(req.user.id);
  }
}
