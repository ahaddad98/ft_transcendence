import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { StatsService } from 'src/services/use-cases/stats/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllStats() {
    return this.statsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOneStats(@Param('id') id: number) {
    return this.statsService.findOneById(id);
  }

  @Get('top/:number')
  @UseGuards(JwtAuthGuard)
  findTopStats(@Param('number') number: number) {
    return this.statsService.findTop({
      relations: ['user'],
      order: {
        level: 'DESC',
        wins: 'DESC',
      },
      take: number,
    });
  }

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  async findMyStats(@Req() req) {
    return await this.statsService.findOneByIdOfUser(req.user.id);
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  async findStatsOfUser(@Param('id') id: number) {
    return await this.statsService.findOneByIdOfUser(id);
  }
}
