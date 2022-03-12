import { Injectable } from '@nestjs/common';
import { UserService } from '../use-cases/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/entities/user.entity';
import { FriendService } from '../use-cases/friend/friend.service';
import { StatsService } from '../use-cases/stats/stats.service';
import { Stats } from 'src/core/entities/stats.entity';

@Injectable()
export class DataService {
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

  async findAllFriendOfUser(user: User) {
    let id: number[];
    let friends: User[] = [];
    await this.friendsService.findAllByUser(user).then((data) => {
      id = data.map((element) => element.friend);
    });
    await Promise.all(
      id.map(async (element) => {
        await this.usersService
          .findOneById(element)
          .then((element) => friends.push(element));
      }),
    );
    return friends;
  }

  async addFriend(userId: number, friendId: number) {
    // let newUser: User;
    // try {
      await this.usersService.findOneById(friendId).then((element) => {
        if (element === undefined) return  { error: 'error' };
        this.usersService
          .findOneByIdWithRelation(userId, { relations: ['friend'] })
          .then((newUser) => {
            if (newUser.friend.find((element) => element.friend == friendId)) {
              console.log('friend is already in the list');
              return { error: 'friend is already in the list' };
              // newUser = data;
            }
            this.friendsService.save(friendId, newUser).then((data) => {
              newUser.friend.push(data);
              this.usersService.save(newUser).then((element) => element);
            }); // hna jabt data dyal user bal friends dyalo
          });
      });
    // } catch (err) {
      // console.log(err);
      // return err;
    // }
  }

  async deleteFriend(userId: number, friendId: number) {
    try {
      let newUser: User;
      await this.usersService.findOneById(friendId).then((element) => {
        if (element === undefined) throw undefined;
      });
      await this.usersService
        .findOneByIdWithRelation(userId, { relations: ['friend'] })
        .then((data) => {
          newUser = data;
        }); // hna jabt data dyal user bal friends dyalo
      await this.friendsService.deleteFriend({
        user: newUser,
        friend: friendId,
      });
    } catch (err) {
      return 'salam';
    }
  }

  async findStatsOfUser(id: number) {
    return this.statsService.findOneByIdOfUser(id);
  }

  async save(newUser: User) {
    let result: any = await this.usersService.findOneById(newUser.id);
    if (!result) {
      console.log('samir');
      const user = await this.usersService.save(newUser);
      console.log(user);
      const stats = new Stats();
      stats.user = user;
      await this.statsService.save(stats);
      console.log('tsayva a sahbi');
    } else console.log('wala a sahbi ma blansh');
  }

  updateStats(id: number, type: string) {
    switch (type) {
      case 'win':
        return this.statsService.updateWins(id);
      case 'lose':
        return this.statsService.updateLoses(id);
    }
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
