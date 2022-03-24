import { Injectable } from '@nestjs/common';
import { UserService } from '../use-cases/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/entities/user.entity';
import { FriendService } from '../use-cases/friend/friend.service';
import { StatsService } from '../use-cases/stats/stats.service';
import { Stats } from 'src/core/entities/stats.entity';
import { HistoryService } from '../use-cases/history/history.service';
import { MessageService } from '../use-cases/message/message.service';
import { Request, RequestType } from 'src/core/entities/request.entity';
import { RequestService } from '../use-cases/request/request.service';
import { Friend } from 'src/core/entities/friend.entity';
import { NotificationService } from '../use-cases/notification/notification.service';
import {
  Notification,
  NotificationType,
} from 'src/core/entities/notification.entity';
import { History, ResultType } from 'src/core/entities/history.entity';
import { fullImagePath } from '../helpers/image-storage';

@Injectable()
export class DataService {
  constructor(
    private usersService: UserService,
    private statsService: StatsService,
    private friendsService: FriendService,
    private historyService: HistoryService,
    private mesagesSercvice: MessageService,
    private notificationsService: NotificationService,
    private requestService: RequestService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    // const { password, ...result } = user;
    // return result;
    // }
    return null;
  }

  async findAllExceptMyProfile(id: number) {
    const me: User = await this.usersService.findOneById(id);
    const users: User[] = await this.usersService.findAllExceptMyProfile(id);
    let allUsers = [];
    let stats: string;
    let requestId;
    console.log(me);
    await Promise.all(
      users.map(async (user) => {
        let userObject: Object = user;
        const friend = await this.friendsService.findMyFriend(me, user.id);
        if (friend === undefined) {
          const request = await this.requestService.findFriendRequestByUsers(
            me,
            user,
          );
          if (typeof request !== 'undefined') {
            requestId = request.id;
            if (request.requester.id === me.id) stats = 'requester';
            else stats = 'recipient';
          } else stats = 'add';
        } else stats = 'remove';
        if (stats === 'requester' || stats === 'recipient')
          userObject = { ...userObject, requestId };
        userObject = { ...userObject, stats };
        allUsers = [...allUsers, userObject];
        // return allUsers;
      }),
    );
    return allUsers;
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
      numberOfFriends: numberFriends.length,
    };
    return userInfo;
  }

  async validateUserChannel(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    // const { password, ...result } = user;
    // return result;
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
    const friend = await this.usersService.findOneById(friendId);
    if (typeof friend === undefined) return { error: 'error' };
    const user = await this.usersService.findOneByIdWithRelation(userId, {
      relations: ['friend'],
    });
    if (user.friend.find((friend) => friend.friend == friendId)) {
      console.log('friend is already in the list');
      return { error: 'friend is already in the list' };
    }
    console.log('first');
    const newFriend: Friend = new Friend();
    newFriend.user = user;
    newFriend.friend = friendId;
    await this.friendsService.save(newFriend);
    const newFriend1: Friend = new Friend();
    newFriend1.user = friend;
    newFriend1.friend = userId;
    await this.friendsService.save(newFriend1);
    return { stats: 200, message: 'friend is add' };
  }

  async addNewResult(userId1: number, userId2: number, result: ResultType) {
    const playerTwo: User = await this.usersService.findOneById(userId2);
    if (typeof playerTwo === undefined)
      return { status: 500, error: 'Player enemi not found' };
    const playerOne: User = await this.usersService.findOneByIdWithRelation(
      userId1,
      { relations: ['history'] },
    );

    const history: History = new History();
    history.user = playerOne;
    history.enemy = playerTwo;
    history.result = result;
    await this.updateStats(userId1, result);
    return await this.historyService.addNewResult(history);
  }

  async updateStats(id: number, type: ResultType) {
    console.log(type);
    switch (type) {
      case ResultType.VICTORY:
        return await this.statsService.updateWins(id);
      case ResultType.DEFEAT:
        return await this.statsService.updateLoses(id);
    }
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

  async newMessage(sender: number, receiver: number) {
    // const conversation: await
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async sendRequestToNewFriend(myId: number, friendId: number) {
    const me: User = await this.usersService.findOneById(myId);
    const friend: User = await this.usersService.findOneById(friendId);

    const newRequest = await this.requestService.sendRequestToNewFriend(
      me,
      friend,
    );
    const notification: Notification = new Notification();
    notification.user = newRequest.recipient;
    notification.sender = newRequest.requester;
    notification.type = NotificationType.REQUEST;
    await this.notificationsService.sendNotificationForRequest(notification);
    console.log('salam');
    return newRequest;
  }

  async acceptRequestToNewFriend(
    reqId: number,
    myId: number,
    friendId: number,
  ) {
    this.requestService.removeRequestById(reqId);
    return await this.addFriend(myId, friendId);
  }

  async findMyNotifications(myId: number) {
    const me: User = await this.usersService.findOneById(myId);
    return this.notificationsService.findMyNotifications(me);
  }

  async updateProfile(file: Express.Multer.File, req) {
    if (file || req.body.username) {
      if (file)
        await this.usersService.updateAvatar(
          req.user.id,
          fullImagePath(file.filename),
        );
      if (req.body.username)
        await this.usersService.updateUsername(req.user.id, req.body.username);
      return { message: 'Profile is updated' };
    } else return { message: 'Profile not updated' };
  }

  async updateAvatar(file: Express.Multer.File, req) {
    if (!file) return { message: 'avatar not updated' };
    await this.usersService.updateAvatar(
      req.user.id,
      fullImagePath(file.filename),
    );
    return { message: 'avatar is updated' };
  }
}
