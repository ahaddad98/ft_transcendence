import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DataService } from 'src/services/data/data.service';
import { JwtAuthGuard } from '../frameworks/auth/jwt/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly dataService: DataService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@Req() req) {
    return req.user;
  }
}
