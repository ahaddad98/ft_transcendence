import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
import { OwnerGuard } from '../guards/owner.guard';

@Controller()
export class AppController {
  // @Get(':id')
  // // @UseGuards(OwnerGuard)
  // @UseGuards(JwtAuthGuard)
  // getHello(): string {
  //   return 'Hi';
  // }
}
