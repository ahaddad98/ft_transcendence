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
import { BlockParams } from 'src/services/helpers/validators';
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
    try {
      return await this.blockService.findAll();
    } catch (err) {
      return err;
    }
  }

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  async getMyBlockList(@Req() req) {
    try {
      return await this.blockService.findMyBlockList(req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Get('users/me/all')
  @UseGuards(JwtAuthGuard)
  async getAllMyBlocksList(@Req() req) {
    try {
      return await this.blockService.findAllMyBlockList(req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Post('add/users/me/:id')
  @UseGuards(JwtAuthGuard)
  async addNewUser(@Req() req, @Param() params: BlockParams) {
    try {
      return await this.dataService.blockUser(req.user.id, params.id);
    } catch (err) {
      return err;
    }
  }

  @Post('remove/users/me/:id')
  @UseGuards(JwtAuthGuard)
  async removeUser(@Req() req, @Param() params: BlockParams) {
    try {
      return await this.dataService.deleteBlock(req.user.id, params.id);
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param() params: BlockParams) {
    try {
      return await this.blockService.delete(params.id);
    } catch (err) {
      return err;
    }
  }
}
