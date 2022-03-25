import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from 'src/services/data/data.service';
import {
  fullImagePath,
  saveImageToStorage,
} from 'src/services/helpers/image-storage';
import { JwtAuthGuard } from '../frameworks/auth/jwt/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly dataService: DataService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req) {
    return await this.dataService.getProfileOfUser(req.user.id);
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  async getAProfile(@Param('id') id: number) {
    return await this.dataService.getProfileOfUser(id);
  }

  @Post('update/users/me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadProfile(@UploadedFile() file: Express.Multer.File, @Req() req): Object {
    return this.dataService.updateProfile(file, req);
  }

  @Put('update/avatar/users/me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req): Object {
    return this.dataService.updateAvatar(file, req);
  }


}
