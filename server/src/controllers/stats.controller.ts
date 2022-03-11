import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Friend } from 'src/core/entities/friend.entity';
import { User } from 'src/core/entities/user.entity';
import { DataService } from 'src/services/data/data.service';
import { FriendService } from 'src/services/use-cases/friend/friend.service';
import { StatsService } from 'src/services/use-cases/stats/stats.service';
import { UserService } from 'src/services/use-cases/user/user.service';
@Controller('stats')
export class StatsController {
  constructor(
    private dataService: DataService,
    private usersService: UserService,
    private friendsService: FriendService,
    private statsService: StatsService,
  ) {}

  @Get()
  findAllStats() {
    return this.statsService.findAll();
  }

  @Get(':id')
  findOneStats(@Param('id') id: number){
    return this.statsService.findOneById(id)
  }

}
