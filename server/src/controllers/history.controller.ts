import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ResultType } from 'src/core/entities/history.entity';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { HistoryService } from 'src/services/use-cases/history/history.service';

@Controller('history')
export class HistoryController {
  constructor(
    private historyService: HistoryService,
    private dataService: DataService,
  ) {}

  @Get()
  async findAllHistories() {
    return await this.historyService.findAll();
  }

  
  @Get('wins')
  @UseGuards(JwtAuthGuard)
  async findAllWins() {
    return await this.historyService.findHistoriesByResult('victory');
  }
  
  @Get('loses')
  @UseGuards(JwtAuthGuard)
  async findAllloses() {
    return await this.historyService.findHistoriesByResult('defeat');
  }

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  async findMyHistories(@Req() req) {
    return await this.historyService.findByUserId(req.user.id);
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  async findHistoryByUserId(@Param('id') id: number) {
    return await this.historyService.findByUserId(id);
  }
  


  @Post('wins/users/me/:id')
  @UseGuards(JwtAuthGuard)
  async addNewWin(@Req() req, @Param('id') id: number) {
    return await this.dataService.addNewResult(
      req.user.id,
      id,
      ResultType.VICTORY,
    );
  }

  @Post('loses/users/me/:id')
  @UseGuards(JwtAuthGuard)
  async addNewLose(@Req() req, @Param('id') id: number) {
    return await this.dataService.addNewResult(
      req.user.id,
      id,
      ResultType.DEFEAT,
    );
  }
}
