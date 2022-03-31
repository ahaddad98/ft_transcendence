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
import { BlockService } from 'src/services/use-cases/block/block.service';

@Controller('blocks')
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

  @Get('users/me/all')
  @UseGuards(JwtAuthGuard)
  async getAllMyBlocksList(@Req() req) {
    return await this.blockService.findAllMyBlockList(req.user.id);
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') user: number) {
    return await this.blockService.delete(user);
  }
}
