import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { DataService } from 'src/services/data/data.service';
import { BlockService } from 'src/services/use-cases/block/block.service';

@Controller('block')
export class BlockController {
  constructor(
    private blockService: BlockService,
    private dataService: DataService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllBlocks() {
    return await this.blockService.findAll();
  }

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  async getMyBlockList(@Req() req) {
    return await this.blockService.findMyBlockList(req.user.id);
  }
  @Post('add/users/me/:userId')
  @UseGuards(JwtAuthGuard)
  async addNewUser(@Req() req, @Param('userId') user: number) {
    return await this.dataService.blockUser(req.user.id, user);
  }

  @Post('remove/users/me/:userId')
  @UseGuards(JwtAuthGuard)
  async removeUser(@Req() req, @Param('userId') user: number) {
    return await this.dataService.deleteBlock(req.user.id, user);
  }
}
