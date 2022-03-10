import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Friend } from 'src/core/entities/friend.entity';
import { User } from 'src/core/entities/user.entity';
import { DataServicesService } from 'src/services/data-services/data-services.service';
import { FriendService } from 'src/services/use-cases/friend/friend.service';
import { UserService } from 'src/services/use-cases/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Observable, of } from 'rxjs';
import { saveImageToStorage } from 'src/services/helpers/image-storage';

@Controller('users')
export class UsersController {
  constructor(
    private dataService: DataServicesService,
    private usersService: UserService,
    private friendsService: FriendService,
  ) {}

  @Get()
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadAvatar(@UploadedFile() file: Express.Multer.File): Observable<Object> {
    return of({ imagePath: file.filename });
  }
  // @Get(':id/friends')
  // async findAllFriends(@Param('id') id: number) {
  //   return this.dataService.findAllFriendOfUser(id);
  // }

  @Post(':id/friends/:friendId')
  async findAllFriend(
    @Param('id') userId: number,
    @Param('friendId') friendId: number,
  ) {
    let newUser: User;
    let result = await this.usersService
      .findOneByIdWithRelation(userId, { relations: ['friend'] })
      .then((data) => (newUser = data));
    // return user;
    const tajriba = new Friend();
    tajriba.friend = friendId;
    tajriba.user = newUser;
    //  { friend: , user: newUser };
    await this.friendsService.save(tajriba).then((data) => {
      // console.log(data);
      newUser.friend.push(data);
      // console.log(newUser);
      // console.log('samir');
    });
    console.log('oussama');
    this.usersService.save(newUser);
    this.usersService
      .findOneByIdWithRelation(userId, { relations: ['friend'] })
      .then((data) => console.log(data));
  }
}
