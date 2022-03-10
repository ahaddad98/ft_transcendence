import { Injectable } from '@nestjs/common';
import { UserService } from '../use-cases/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/entities/user.entity';
import { FriendService } from '../use-cases/friend/friend.service';
import { StatsService } from '../use-cases/stats/stats.service';
import { Stats } from 'src/core/entities/stats.entity';

@Injectable()
export class DataServicesService {
  constructor(
    private usersService: UserService,
    private statsService: StatsService,
    private friendsService: FriendService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async findAllFriendOfUser(idUser: number) {
  //   let id: number[];
  //   let friends: User[] = [];
  //   await this.friendsService.findAllByUserId(idUser).then((data) => {
  //     id = data.map((element) => element.idFriend);
  //   });

  //   await Promise.all(
  //     id.map(async (element) => {
  //       await this.usersService
  //         .findOneById(element)
  //         .then((element) => friends.push(element));
  //       // console.log('salam');
  //     }),
  //   );
  //   console.log(friends);
  //   return friends;
  // }
  
  async save(newUser: User) {
    let result: any = await this.usersService.findOne(newUser.username);
    if (!result) {
      const user = await this.usersService.save(newUser);
      const stats = new Stats();
      stats.user = user;
      await this.statsService.save(stats);
    } else console.log('wala a sahbi ma blansh');
  }

  login(user: any) {
    const payload = { login: user.login, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
