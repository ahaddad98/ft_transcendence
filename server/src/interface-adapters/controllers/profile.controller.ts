import {
  Body,
  Controller,
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
import { saveImageToStorage } from 'src/services/helpers/image-storage';
import { UpdateUsername, UserParams } from 'src/services/helpers/validators';
import { JwtAuthGuard } from '../../frameworks/auth/jwt/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly dataService: DataService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    try {
      return req.user;
    } catch (err) {
      return err;
    }
  }

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req) {
    try {
      return await this.dataService.getProfileOfUser(req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  async getAProfile(@Param() params: UserParams) {
    try {
      return await this.dataService.getProfileOfUser(params.id);
    } catch (err) {
      return err;
    }
  }

  @Post('update/users/me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateUsername,
    @Req() req,
  ): Object {
    try {
      return this.dataService.updateProfile(file, body, req.user.id);
    } catch (err) {
      return err;
    }
  }

  @Put('update/avatar/users/me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req): Object {
    try {
      // console.log(readFile(file.path));
      // console.log(file);
      // return file;
      return this.dataService.updateAvatar(file, req);
    } catch (err) {
      return err;
    }
  }
}
