import { Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import { UserService } from '../use-cases/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/entities/user.entity';
import { FriendService } from '../use-cases/friend/friend.service';
import { MessageService } from '../use-cases/message/message.service';
import { Request, RequestType } from 'src/core/entities/request.entity';
import { RequestService } from '../use-cases/request/request.service';
import { Friend } from 'src/core/entities/friend.entity';
import { NotificationService } from '../use-cases/notification/notification.service';
import {
  Notification,
  NotificationType,
} from 'src/core/entities/notification.entity';
import { fullImagePath } from '../helpers/image-storage';
import {
  Conversation,
  ConversationType,
} from 'src/core/entities/conversation.entity';
import { ConversationService } from '../use-cases/conversation/conversation.service';
import { Message } from 'src/core/entities/message.entity';
import { ConversationUser } from 'src/core/entities/conversation-user.entity';
import { ConversationUserService } from '../use-cases/conversation-user/conversation-user.service';
import {
  CreateChannelDto,
  CreatePublicChannelDto,
  UpdatePasswordChannelDto,
} from 'src/core/dtos/channel.dto';
import { Channel, ChannelType } from 'src/core/entities/channel.entity';
import * as bcrypt from 'bcrypt';
import { ChannelService } from '../use-cases/channel/channel.service';
import { ChannelUser, UserType } from 'src/core/entities/channel-user.entity';
import { ChannelUserService } from '../use-cases/channel-user/channel-user.service';
import { compareAsc, format } from 'date-fns';
import { channel } from 'diagnostics_channel';

@Injectable()
export class DataService {
  constructor(
    private usersService: UserService,
    private friendsService: FriendService,
    private messageService: MessageService,
    private notificationsService: NotificationService,
    private requestService: RequestService,
    private conversationService: ConversationService,
    private conversationUserService: ConversationUserService,
    private channelService: ChannelService,
    private channelUserService: ChannelUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(channelId: number, req): Promise<any> {
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!req.body.password) throw new UnauthorizedException();
    const check = await bcrypt.compare(req.body.password, channel.password);
    console.log(check);
    if (channel && check) {
      return await this.addNewUserToChannel(
        channelId,
        req.user.id,
        UserType.USER,
      );
    }
    throw new UnauthorizedException();
    // return false;
  }

  async findAllExceptMyProfile(id: number) {
    const me: User = await this.usersService.findOneById(id);
    const users: User[] = await this.usersService.findAllExceptMyProfile(id);
    let allUsers = [];
    let stats: string;
    let requestId: number;
    console.log(me);
    await Promise.all(
      users.map(async (user) => {
        requestId = undefined;
        let userObject: Object = user;
        const friend = await this.friendsService.findMyFriend(me, user);
        console.log('salam');
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
        userObject = { ...userObject, requestId, stats };
        allUsers = [...allUsers, userObject];
      }),
    );
    return allUsers;
  }

  async getProfileOfUser(id: number) {
    let user: User = await this.usersService.findOneById(id);
    let numberFriends = await this.friendsService.findAllByUser(user);
    console.log(numberFriends.length);
    const userInfo: Object = {
      // id: user.id,
      // username: user.username,
      // avatar: user.avatar,
      // email: user.email,
      // stats: {

      // },
      user,
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
    return await this.friendsService.findAllByUser(user);
    //  .then((data) => {
    // id = data.map((element) => element.friend);
    // );
    // await Promise.all(
    //   id.map(async (element) => {
    //     await this.usersService
    //       .findOneById(element)
    //       .then((element) => friends.push(element));
    //   }),
    // );
    // return friends;
  }

  async addFriend(userId: number, friendId: number) {
    const friend = await this.usersService.findOneById(friendId);
    if (typeof friend === undefined) return { error: 'error' };
    const user = await this.usersService.findOneByIdWithRelation(userId, {
      relations: ['friend'],
    });
    if (user.friend.find((friend) => friend.friend?.id == friendId)) {
      console.log('friend is already in the list');
      return { error: 'friend is already in the list' };
    }
    const newFriend: Friend = new Friend();
    newFriend.user = user;
    newFriend.friend = friend;
    await this.friendsService.save(newFriend);
    const newFriend1: Friend = new Friend();
    newFriend1.user = friend;
    newFriend1.friend = user;
    await this.friendsService.save(newFriend1);
    return { stats: 200, message: 'friend is add' };
  }

  // async addNewResult(userId1: number, userId2: number, result: ResultType) {
  // const playerTwo: User = await this.usersService.findOneById(userId2);
  // if (typeof playerTwo === undefined)
  //   return { status: 500, error: 'Player enemi not found' };
  // const playerOne: User = await this.usersService.findOneByIdWithRelation(
  //   userId1,
  //   { relations: ['history'] },
  // );

  // const history: History = new History();
  // history.user = playerOne;
  // history.enemy = playerTwo;
  // history.result = result;
  // await this.updateStats(userId1, result);
  // return await this.historyService.addNewResult(history);
  // }

  // async updateStats(id: number, type: ResultType) {
  // console.log(type);
  // switch (type) {
  //   case ResultType.VICTORY:
  //     return await this.statsService.updateWins(id);
  //   case ResultType.DEFEAT:
  //     return await this.statsService.updateLoses(id);
  // }
  // }

  async deleteFriend(userId: number, friendId: number) {
    try {
      let newUser: User;
      await this.usersService.findOneById(friendId).then((element) => {
        if (element === undefined) throw undefined;
      });
      newUser = await this.usersService.findOneByIdWithRelation(userId, {
        relations: ['friend'],
      });
      await this.friendsService.deleteFriend({
        user: newUser,
        friend: friendId,
      });
    } catch (err) {
      return 'salam';
    }
  }

  // async findStatsOfUser(id: number) {
  //   return this.statsService.findOneByIdOfUser(id);
  // }

  async save(newUser: User) {
    let result: any = await this.usersService.findOneById(newUser.id);
    if (!result) {
      console.log('samir');
      const user = await this.usersService.save(newUser);
      console.log(user);
      console.log('tsayva a sahbi');
    } else console.log('wala a sahbi ma blansh');
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
    const result = await this.addFriend(myId, friendId);
    await this.requestService.removeRequestById(reqId);
    return result;
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

  async sendNewMessage(req, id: number) {
    // console.log(req.body);
    const conversation: Conversation =
      await this.conversationService.findConversationById(id);
    const message: Message = new Message();
    message.content = req.body.message;
    message.sender = req.user.id;
    message.conversation = conversation;
    message.createdAt = new Date();
    this.conversationService.updateTime(conversation.id, {
      updatedAt: new Date(),
    });
    // TODO  hadi anriglha ghada insh'allah
    // const usersConversation: Conversation =
    //   await this.conversationService.findUsersOfConversationById(id);
    // console.log(usersConversation);
    // const notification: Notification = new Notification();
    // notification.user = newRequest.recipient;
    // notification.sender = message.sender;
    // notification.type = NotificationType.MESSAGE;
    // await this.notificationsService.sendNotificationForRequest(notification);
    // khasni nfakar f blan dyal channel ki andir lih
    return await this.messageService.addNewMessage(message);
  }

  async findConversationWithMessages(id: number) {
    const conversation: Conversation =
      await this.conversationService.findConversationByIdWithQuery(id);
    console.log(conversation);
    return conversation;
  }

  async getallMessageOfoneOfmyConversations(conversationId: number) {
    const conversation: Conversation =
      await this.conversationService.findConversationById(conversationId);
    return await this.messageService.getallMessageOfoneOfmyConversations(
      conversation,
    );
  }

  async addNewPrivateConversation(myId: number, userId: number) {
    const user1 = await this.usersService.findOneById(myId);
    const user2 = await this.usersService.findOneById(userId);
    let conversation: Conversation = new Conversation();
    conversation = await this.conversationService.saveNewConversation(
      conversation,
    );
    let conversationUser: ConversationUser = new ConversationUser();
    conversationUser.conversation = conversation;
    conversationUser.user = user1;
    this.conversationUserService.save(conversationUser);
    let conversationUser2: ConversationUser = new ConversationUser();
    conversationUser2.conversation = conversation;
    conversationUser2.user = user2;
    this.conversationUserService.save(conversationUser2);
    return conversation;
  }

  async findAllChannels(id: number) {
    const allChannels = await this.channelService.findAllChannels();
    let arr = [];
    await Promise.all(
      allChannels.map(async (newChannel) => {
        let status: string;
        const channelUser = await this.findChannelUser(newChannel.id, id);
        if (channelUser && channelUser.block === false) {
        } else {
          if (!channelUser) status = 'join';
          else if (channelUser.block === true) status = 'blocked';
          const object = {
            id: newChannel.id,
            name: newChannel.name,
            type: newChannel.type,
            createdAt: format(newChannel.createdAt, 'MMMM dd,yyyy'),
            members: newChannel.members,
            owner: newChannel.owner,
            status: status,
          };
          arr.push(object);
        }
      }),
    );
    return arr;
  }

  async findAllMyChannels(id: number) {
    const channelUser: ChannelUser[] =
      await this.channelUserService.findAllMyChannels(id);
    let arr = [];
    channelUser.map((element) => {
      const object = {
        id: element.channel.id,
        name: element.channel.name,
        type: element.channel.type,
        createdAt: format(element.channel.createdAt, 'MMMM dd,yyyy'),
        members: element.channel.members,
        role: element.userType,
      };
      arr.push(object);
    });
    return arr;
  }
  async addNewChannelConversation(myId: number) {
    const user1 = await this.usersService.findOneById(myId);
    let conversation: Conversation = new Conversation();
    conversation.type = ConversationType.CHANNEL;
    conversation = await this.conversationService.saveNewConversation(
      conversation,
    );
    let conversationUser: ConversationUser = new ConversationUser();
    conversationUser.conversation = conversation;
    conversationUser.user = user1;
    this.conversationUserService.save(conversationUser);
    return conversation;
  }

  async addNewUserToChannelConversation(
    userId: number,
    conversationId: number,
  ) {
    const newConversation: Conversation =
      await this.conversationService.findConversationById(conversationId);
    const newUser: User = await this.usersService.findOneById(userId);
    const conversationUser: ConversationUser = new ConversationUser();
    conversationUser.conversation = newConversation;
    conversationUser.user = newUser;
    this.conversationUserService.save(conversationUser);
    return newConversation;
  }

  async getAllMyConversations(id: number) {
    const user = await this.usersService.findOneById(id);
    console.log(user);
    const conversationUser =
      this.conversationUserService.findallMyConversations(user);

    return conversationUser;
  }

  async addNewPrivateChannel(
    file: Express.Multer.File,
    body: CreateChannelDto,
    myId: number,
  ) {
    const user: User = await this.usersService.findOneById(myId);
    const owner: boolean = await this.channelService.searchForOwner(user);
    if (owner) return { message: 'U have already a channel' };
    let channel: Channel = new Channel();
    channel.name = body.name;
    const hash = await bcrypt.hash(body.password, 10);
    channel.type = ChannelType.PRIVATE;
    channel.password = hash;
    channel.owner = user;
    channel.conversation = await this.addNewChannelConversation(myId);
    channel = await this.channelService.save(channel);
    console.log('salam');
    await this.addNewUserToChannel(channel.id, user.id, UserType.OWNER);
    return channel;
  }

  async addNewPublicChannel(
    file: Express.Multer.File,
    body: CreatePublicChannelDto,
    myId: number,
  ) {
    const user: User = await this.usersService.findOneById(myId);
    const owner: boolean = await this.channelService.searchForOwner(user);
    if (owner) return { message: 'U have already a channel' };
    let channel: Channel = new Channel();
    channel.type = ChannelType.PUBLIC;
    channel.name = body.name;
    channel.owner = user;
    channel.conversation = await this.addNewChannelConversation(myId);
    channel = await this.channelService.save(channel);
    await this.addNewUserToChannel(channel.id, user.id, UserType.OWNER);
    return user;
  }

  async addNewUserToChannel(
    channelId: number,
    userId: number,
    userType: UserType,
  ) {
    const newUser: User = await this.usersService.findOneById(userId);
    const newChannel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    await this.channelService.updateNumberOfMembers(
      newChannel.id,
      ++newChannel.members,
    );
    const channelUser: ChannelUser = new ChannelUser();
    channelUser.channel = newChannel;
    channelUser.user = newUser;
    channelUser.userType = userType;
    console.log(newUser);
    console.log(newChannel);
    if (userType != UserType.OWNER)
      await this.addNewUserToChannelConversation(
        newUser.id,
        newChannel.conversation.id,
      );
    return await this.channelUserService.save(channelUser);
  }

  async listUsersOfChannel(channelId: number, myId: number) {
    const newChannel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    const newUser: User = await this.usersService.findOneById(myId);
    const result = await this.channelUserService.findAllUsersInChannel(
      newChannel,
      newUser,
    );
    const arr = [];
    for (let i = 0; i < result.length; i++) {
      let object = {
        id: result[i].user.id,
        username: result[i].user.username,
        avatar: result[i].user.avatar,
        is_online: result[i].user.is_online,
        userType: result[i].userType,
        block: result[i].block,
        mute: result[i].mute,
      };
      arr.push(object);
    }
    return arr;
  }

  async leavesTheChannel(channelId: number, myId: number) {
    const newChannel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    const newUser: User = await this.usersService.findOneById(myId);
    const chanelUser = await this.channelUserService.findbyChannelAndUser(
      newChannel,
      newUser,
    );
    if (newUser.id === newChannel.owner.id)
      return await this.removeChannel(channelId); //TODO hna ra khasni nhaydo hta man conv
    return await this.channelUserService.remove(chanelUser.id);
  }

  // opti
  async findChannelUser(channelId: number, myId: number) {
    const newChannel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    const newUser: User = await this.usersService.findOneById(myId);
    const chanelUser = await this.channelUserService.findbyChannelAndUser(
      newChannel,
      newUser,
    );
    return chanelUser;
  }

  async changeUserToBeAdminInChannel(channelId: number, myId: number) {
    const chanelUser = await this.findChannelUser(channelId, myId);
    return await this.channelUserService.updateToBeAdmin(chanelUser.id);
  }

  async changeAdminToBeUserInChannel(channelId: number, myId: number) {
    const chanelUser = await this.findChannelUser(channelId, myId);
    return await this.channelUserService.updateToBeUser(chanelUser.id);
  }

  async muteUserInChannel(channelId: number, myId: number) {
    const chanelUser = await this.findChannelUser(channelId, myId);
    chanelUser.mute = !chanelUser.mute;
    return await this.channelUserService.updateMute(
      chanelUser.id,
      chanelUser.mute,
    );
  }

  async kickUserFormChannelConversation(channelId: number, myId: number) {
    const conversation: Conversation =
      await this.conversationService.findConversationOfChannel(channelId);
    const conversationUser =
      await this.conversationUserService.findConversationUser(
        conversation.id,
        myId,
      );
    return await this.conversationUserService.remove(conversationUser);
  }

  async blockUserInChannel(channelId: number, myId: number) {
    const chanelUser = await this.findChannelUser(channelId, myId);
    chanelUser.block = !chanelUser.block;
    if (chanelUser.block === false)
      return await this.leavesTheChannel(channelId, myId);
    await this.kickUserFormChannelConversation(channelId, myId);
    return await this.channelUserService.updateBlock(
      chanelUser.id,
      chanelUser.block,
    );
  }

  async removeChannel(id: number) {
    const channel = await this.channelService.findChannelById(id);
    if (!channel) return { status: 500, message: 'channel not found' };
    const conversation: Conversation =
      await this.conversationService.findConversationOfChannel(id);
    await this.conversationService.remove(conversation);
    return await this.channelService.remove(channel);
  }

  async UpdateChannelPassword(
    channelId: number,
    body: UpdatePasswordChannelDto,
    myId: number,
  ) {
    // TODO khasni ndelte users
    const me: User = await this.usersService.findOneById(myId);
    const channel = await this.channelService.findChannelById(channelId);
    channel.password = await bcrypt.hash(body.password, 10);

    const users = await this.channelUserService.findAllUsersInChannel(
      channel,
      me,
    );

    await Promise.all(
      users.map(async (user) => {
        if (user.userType === UserType.USER) {
          console.log(user.user);
          await this.kickUserFormChannelConversation(channel.id, user.user.id);
          console.log('salam');
          await this.leavesTheChannel(channelId, user.user.id);
        }
      }),
    );
    return { status: 200, message: 'password is updated' };
    // return await this.channelService.updatePassowrd(
    //   channel.id,
    //   channel.password,
    // );
  }
}
