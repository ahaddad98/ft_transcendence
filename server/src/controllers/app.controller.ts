import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {
  @Post()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return 'Hi';
  }
}
