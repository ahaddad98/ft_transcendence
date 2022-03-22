import { Injectable } from '@nestjs/common';
import { UserService } from '../use-cases/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/entities/user.entity';
import { FriendService } from '../use-cases/friend/friend.service';
import { StatsService } from '../use-cases/stats/stats.service';
import { Stats } from 'src/core/entities/stats.entity';
import { HistoryService } from '../use-cases/history/history.service';
import { MessageService } from '../use-cases/message/message.service';

@Injectable()
export class DataService {
  constructor(
    private usersService: UserService,
    private statsService: StatsService,
    private friendsService: FriendService,
    private historyService: HistoryService,
    private mesagesSercvice: MessageService,
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

  async getProfileOfUser(id: number) {
    let user: User = await this.usersService.findOneById(id);
    let numberFriends = await this.friendsService.findAllByUser(user);
    console.log(numberFriends.length);
    const statsUser: Object = user.stats;
    const userInfo: Object = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      stats: statsUser,
      numberOfFriends: numberFriends.length
    }
    return userInfo;
  }

  async validateUserChannel(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    const { password, ...result } = user;
    return result;
    // }
    // return null;
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
    return await this.usersService
      .findOneById(friendId)
      .then(async (element) => {
        if (element === undefined) return { error: 'error' };
        return await this.usersService
          .findOneByIdWithRelation(userId, { relations: ['friend'] })
          .then(async (newUser) => {
            if (newUser.friend.find((element) => element.friend == friendId)) {
              console.log('friend is already in the list');
              return { error: 'friend is already in the list' };
            }
            console.log('first');
            await this.friendsService.save(friendId, newUser); // hna jabt data dyal user bal friends dyalo
          });
      });
  }

  async addNewStat(me: number, win: boolean, playerTwo: number) {
    return await this.usersService
      .findOneById(playerTwo)
      .then(async (player) => {
        if (player === undefined)
          return { status: 500, error: 'Player enemi not found' };
        return await this.usersService
          .findOneByIdWithRelation(me, { relations: ['history'] })
          .then(async (user) => {
            return await this.historyService
              .addNewStat(user, win, playerTwo)
              .then(async (history) => {
                // user.history.push(history);
                if (win === true) console.log('win');
                else console.log('lose');
                // const ss = (win === 'true') ? 'win' : 'lose';
                // console.log(ss);
                await this.updateStats(me, win === true ? 'win' : 'lose');
                return await this.usersService.findOneByIdWithRelation(me, {
                  relations: ['history'],
                });
                // await this.usersService.updateHistory(me, user.history);
              });
          });
      });
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

  async updateStats(id: number, type: string) {
    console.log(type);
    switch (type) {
      case 'win':
        return await this.statsService.updateWins(id);
      case 'lose':
        return await this.statsService.updateLoses(id);
    }
  }

  async newMessage(sender: number, receiver: number) {
    // const conversation: await
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
