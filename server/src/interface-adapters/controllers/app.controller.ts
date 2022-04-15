import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/frameworks/auth/jwt/jwt-auth.guard';
// import { IntParams } from 'src/services/helpers/validators';
import { OwnerGuard } from '../guards/owner.guard';

@Controller()
export class AppController {
  @Get('')
  @UseGuards(JwtAuthGuard)
  getHello(@Param() id: number) {
    return id;
  }
}
