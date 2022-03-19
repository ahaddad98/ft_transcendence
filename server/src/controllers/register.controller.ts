import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/core/dtos/user.dto';
import { Stats } from 'src/core/entities/stats.entity';
import { User } from 'src/core/entities/user.entity';
import { DataService } from 'src/services/data/data.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  async register(@Req() req, @Body() createCatDto: CreateUserDto) {
    const user: User = { ...createCatDto, friend: [] };
    console.log(user);
    this.dataService.save(user);
    console.log('wa sat');
    return createCatDto;
  }
}
