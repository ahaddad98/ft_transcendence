import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DataServicesService } from 'src/services/data-services/data-services.service';
import { JwtAuthGuard } from '../frameworks/auth/jwt/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly dataService: DataServicesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@Req() req) {
    return req.user;
  }
}
