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
import { fullImagePath, isFileExtensionSafe } from '../helpers/image-storage';
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
} from 'src/core/dtos/channel.dto';
import { Channel, ChannelType } from 'src/core/entities/channel.entity';
import * as bcrypt from 'bcrypt';
import { ChannelService } from '../use-cases/channel/channel.service';
import { ChannelUser, UserType } from 'src/core/entities/channel-user.entity';
import { ChannelUserService } from '../use-cases/channel-user/channel-user.service';
import { format, isThursday } from 'date-fns';
import * as speakeasy from 'speakeasy';
import { Block } from 'src/core/entities/block.entity';
import { BlockService } from '../use-cases/block/block.service';
import { UpdatePasswordChannel, UpdateUsername } from '../helpers/validators';
import * as moment from 'moment';

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
    private blockService: BlockService,
  ) {}

  async validateUser(
    channelId: number,
    body: UpdatePasswordChannel,
    myId: number,
  ): Promise<any> {
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!body.password) throw new UnauthorizedException();
    const check = await bcrypt.compare(body.password, channel.password);
    if (channel && check) {
      return await this.addNewUserToChannel(channelId, myId, UserType.USER);
    }
    throw new UnauthorizedException();
    // return false;
  }

  async findAllExceptMyProfile(id: number) {
    const me: User = await this.usersService.findOneById(id);
    const users: User[] = await this.usersService.findAllExceptMyProfile(id);
    let allUsers = [];
    let check;
    let stats: string;
    let requestId: number;
    const blockList: Block[] = await this.blockService.findAllMyBlockList(id);
    const newblockList = [];
    blockList.map((blockUser) => {
      if(blockUser.user.id == id)
      newblockList.push({hide: false, user: blockUser.block})
      else
      newblockList.push({hide: true, user:blockUser.user})
      // newblockList.push(
      //   blockUser.user.id == id ? blockUser.block : blockUser.user,
      // );
    });
    console.log(newblockList);
    await Promise.all(
      users.map(async (user) => {
        let block: boolean =  false; 
        requestId = undefined;
        let userObject: Object = user;
        const friend = await this.friendsService.findMyFriend(me, user);
        if (newblockList.length > 0) {

          check = newblockList.find((element) => {
            if(element.hide == false && element.user.id == user.id)
            {
              block = true;
              return undefined
            }
            else if(element.hide == true && element.user.id == user.id)
            {
              block = false
              return true;
            }
            return undefined;
            // return element.id == user.id;
          });
        }
        if (!check) {
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
          userObject = { ...userObject, requestId, stats , block};
          allUsers = [...allUsers, userObject];
        }
      }),
    );
    return allUsers;
  }

  async getProfileOfUser(id: number) {
    let user: User = await this.usersService.findOneById(id);
    let numberFriends = await this.friendsService.findAllByUser(user);
    const userInfo: Object = {
      user,
      numberOfFriends: numberFriends.length,
    };
    return userInfo;
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

  async deleteFriend(userId: number, friendId: number) {
    try {
      const friend: User = await this.usersService.findOneById(friendId);
      if (!friend) return { status: 500, message: 'this user is not fount' };
      const user: User = await this.usersService.findOneById(userId);
      const list: Friend[] = await this.friendsService.findTwoFriends(
        userId,
        friendId,
      );
      if (list) return await this.friendsService.removeFriends(list);
      return { status: 500, message: 'error' };
    } catch (err) {
      return err;
    }
  }

  async save(newUser: User) {
    let result: any = await this.usersService.findOneById(newUser.id);
    if (!result) {
      const user = await this.usersService.save(newUser);
    } else console.log('wala a sahbi ma blansh');
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  // addFriend
  async sendRequestToNewFriend(myId: number, friendId: number) {
    if (myId == friendId)
      return { status: 500, message: 'U cant send a request to urself' };
    const me: User = await this.usersService.findOneById(myId);
    const friend: User = await this.usersService.findOneById(friendId);
    if (!me || !friend) return { status: 500, message: 'User Not Found' };
    const checkRequest: Request =
      await this.requestService.findFriendRequestByUsers(me, friend);
    if (checkRequest)
      return { status: 500, message: 'Request is already sent' };
    const newRequest = await this.requestService.sendRequestToNewFriend(
      me,
      friend,
    );
    const notification: Notification = new Notification();
    notification.user = newRequest.recipient;
    notification.sender = newRequest.requester;
    notification.type = NotificationType.REQUEST;
    await this.notificationsService.sendNotificationForRequest(notification);
    return newRequest;
  }

  async acceptRequestToNewFriend(
    reqId: number,
    myId: number,
    friendId: number,
  ) {
    const me: User = await this.usersService.findOneById(myId);
    const friend: User = await this.usersService.findOneById(friendId);
    const checkRequest: Request =
      await this.requestService.findFriendRequestByUsers(me, friend);
    // console.log('saidsads');
    if (!checkRequest) return { status: 500, message: 'No Request Found' };
    await this.requestService.removeRequestById(reqId);
    const result = await this.addFriend(myId, friendId);
    return result;
  }

  async findMyNotifications(myId: number) {
    const me: User = await this.usersService.findOneById(myId);
    return this.notificationsService.findMyNotifications(me);
  }

  async updateProfile(
    file: Express.Multer.File,
    body: UpdateUsername,
    myId: number,
  ) {
    if (file || body.username) {
      if (file) {
        const check = await isFileExtensionSafe(file.path);
        if (check == true) {
          await this.usersService.updateAvatar(
            myId,
            fullImagePath(file.filename),
          );
        } else console.log('file is not safe');
      }
      if (body.username)
        await this.usersService.updateUsername(myId, body.username);
      return { message: 'Profile is updated' };
    } else return { message: 'Profile not updated' };
  }

  async updateAvatar(file: Express.Multer.File, req) {
    if (!file) return { message: 'avatar not updated' };
    const check = await isFileExtensionSafe(file.path);
    if (check == false) return { message: 'file is not safe' };
    await this.usersService.updateAvatar(
      req.user.id,
      fullImagePath(file.filename),
    );
    return { message: 'avatar is updated' };
  }

  // messages
  async sendNewMessage(req, id: number) {
    // console.log(req.body);
    const conversation: Conversation =
      await this.conversationService.findConversationById(id);
    const newUser: User = await this.usersService.findOneById(req.user.id);
    const message: Message = new Message();
    message.content = req.body.message;
    message.sender = newUser;
    message.conversation = conversation;
    message.createdAt = new Date();
    this.conversationService.updateTime(conversation.id, {
      updatedAt: new Date(),
    });
    const usersConversation: ConversationUser[] =
      await this.conversationUserService.findAllUsersInConversationWithoutMe(
        conversation,
        req.user.id,
      );
    await Promise.all(
      usersConversation.map(async (user) => {
        const notification: Notification = new Notification();
        notification.user = user.user;
        notification.sender = newUser;
        notification.type = NotificationType.MESSAGE;
        await this.notificationsService.sendNotificationForRequest(
          notification,
        );
      }),
    );
    return await this.messageService.addNewMessage(message);
  }

  async findConversationWithMessages(conversationId: number, myId: number) {
    const arr = [];
    const conversation: Conversation =
      await this.conversationService.findConversationByIdWithQuery(
        conversationId,
      );
    if (!conversation) return [];
    const conversationUsers: ConversationUser[] =
      await this.conversationUserService.findUsersOfConversations(
        conversationId,
      );
    conversationUsers.map((user) => {
      arr.push(user.user);
    });
    const me: User = await this.usersService.findOneById(myId);
    const blockList: Block[] = await this.blockService.findAllMyBlockList(myId);
    const newblockList = [];
    blockList.map((blockUser) => {
      newblockList.push(
        blockUser.user.id == myId ? blockUser.block : blockUser.user,
      );
    });
    const messages = [];
    conversation.message.map((message) => {
      let object = {};
      const check = newblockList.find((newUser) => {
        return newUser.id == message.sender.id;
      });
      if (!check) {
        object = message;
        object = { ...object, me };
        messages.push(object);
      }
    });
    return messages;
  }

  async findConversationById(id: number) {
    const conversation = await this.conversationService.findConversationById(id);
    const usersOfConversation = await this.conversationUserService.findUsersOfConversations(id);
    let arrayOfUsers = [];
    usersOfConversation.map((user) => arrayOfUsers.push(user.user));
    let conversationWithUsers = {users: arrayOfUsers,conversation};
    return conversationWithUsers;
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
    const privateConversations = await this.getAllMyPrivateConversations(myId);
    const check = privateConversations.find((element) => {
      return element.user.id == userId;
    });
    if (check) return check;
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

  // Channels

  async joinPrivateChannel(
    channelId: number,
    body: UpdatePasswordChannel,
    myId,
  ) {
    const channelUser = await this.findChannelUser(channelId, myId);
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!channel) return { status: 500, message: 'channel Not Found' };
    if (!channelUser) return await this.validateUser(channelId, body, myId);
    return { status: 500, message: 'you are already in this channel' };
  }

  async joinPublicChannel(channelId: number, myId: number) {
    const channelUser = await this.findChannelUser(channelId, myId);
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!channel) return { status: 500, message: 'channel Not Found' };
    if (!channelUser)
      return await this.addNewUserToChannel(channelId, myId, UserType.USER);
    return { status: 500, message: 'you are already in this channel' };
  }

  async findAllChannels(id: number, userId: number) {
    await this.checkUserBanMute(userId);
    const allChannels = await this.channelService.findAllChannels();
    let arr = [];
    await Promise.all(
      allChannels.map(async (newChannel) => {
        const channelUser = await this.findChannelUser(newChannel.id, id);
        if (!channelUser) {
          const object = {
            id: newChannel.id,
            name: newChannel.name,
            type: newChannel.type,
            createdAt: format(newChannel.createdAt, 'MMMM dd,yyyy'),
            members: newChannel.members,
            owner: newChannel.owner,
            status: 'join',
          };
          arr.push(object);
        }
      }),
    );
    // console.log(arr);
    return arr;
  }

  async checkUserBanMute(id: number) {
    const channelUser: ChannelUser[] =
      await this.channelUserService.findAllMyChannels(id);
    await Promise.all(
      channelUser.map(async (element) => {
        if (
          (element.ban == true || element.mute == true) &&
          element.period > 0
        ) {
          const firstDate = moment(element.timeOfOperation);
          const nowDate = moment(new Date());
          const interval = Math.abs(firstDate.diff(nowDate, 'minutes'));
          if (interval >= element.period) {
            if (element.ban == true)
              await this.removeBanUserInChannel(element.channel.id, id);
            else await this.channelUserService.removeMute(element.id);
          }
        }
      }),
    );
  }

  async findAllMyChannels(id: number) {
    await this.checkUserBanMute(id);
    const channelUser: ChannelUser[] =
      await this.channelUserService.findAllMyChannels(id);
    let arr = [];
    await Promise.all(
      channelUser.map(async (element) => {
        if (element.ban == false) {
          const object = {
            id: element.channel.id,
            name: element.channel.name,
            type: element.channel.type,
            createdAt: format(element.channel.createdAt, 'MMMM dd,yyyy'),
            members: element.channel.members,
            role: element.userType,
            ban: element.ban,
          };
          arr.push(object);
        }
      }),
    );
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
    const conversationUser =
      await this.conversationUserService.findallMyConversations(user);
    return conversationUser;
  }

  async getAllMyPrivateConversations(id: number) {
    const me = await this.usersService.findOneById(id);
    const conversationUser =
      await this.conversationUserService.findAllMyPrivatesConversations(me);
    if (!conversationUser) return [];
    let arr = [];
    await Promise.all(
      conversationUser.map(async (element) => {
        let user = {};
        let object = {};
        let lastMessage = '';
        const conversationWithMessage =
          await this.conversationService.findConversationByIdWithQuery(
            element.conversation.id,
          );
        const conversation =
          await this.conversationService.findConversationById(
            element.conversation.id,
          );
        const userChat =
          await this.conversationUserService.findUserInConversationWithoutMe(
            conversation,
            id,
          );
        user = {
          id: userChat.user.id,
          username: userChat.user.username,
          email: userChat.user.email,
          avatar: userChat.user.avatar,
        };
        if (conversationWithMessage)
          lastMessage =
            conversation.message[conversation.message.length - 1].content;
        object = {
          id: conversation.id,
          time: conversation.updatedAt,
          message: lastMessage,
          user: user,
        };
        arr.push(object);
      }),
    );
    return arr;
  }

  async addNewPrivateChannel(body: CreateChannelDto, myId: number) {
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
    await this.addNewUserToChannel(channel.id, user.id, UserType.OWNER);
    return channel;
  }

  async addNewPublicChannel(body: CreatePublicChannelDto, myId: number) {
    const user: User = await this.usersService.findOneById(myId);
    const owner: boolean = await this.channelService.searchForOwner(user);
    if (owner) return { message: 'U have already a channel' };
    let channel: Channel = new Channel();
    channel.type = ChannelType.PUBLIC;
    channel.name = body.name;
    channel.owner = user;
    channel.conversation = await this.addNewChannelConversation(myId);
    channel = await this.channelService.save(channel);
    const channelUser = await this.addNewUserToChannel(
      channel.id,
      user.id,
      UserType.OWNER,
    );
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
    if (userType != UserType.OWNER)
      await this.addNewUserToChannelConversation(
        newUser.id,
        newChannel.conversation.id,
      );
    return await this.channelUserService.save(channelUser);
  }

  async findMyChannel(channelId: number, me: number) {
    const channel = await this.channelService.findChannelById(channelId);
    if (!channel) return { status: 500, message: 'channel not found' };
    const user: User = await this.usersService.findOneById(me);
    const channelUser: ChannelUser =
      await this.channelUserService.findbyChannelAndUser(channel, user);
    if (!channelUser) {
      throw UnauthorizedException;
      // return { status: 500, message: 'U dont have acces to this channel' };
    }
    const object = {
      ...channel,
      myRole: channelUser.userType,
      mute: channelUser.mute,
    };
    return object;
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
        block: result[i].ban,
        mute: result[i].mute,
      };
      arr.push(object);
    }
    return arr;
  }

  async listUsersOfChannelWitouhtMe(channelId: number) {
    console.log('-------------------');
    console.log('channelId: '+ channelId)
    // console.log('channelId: '+ channelId)
    console.log('-------------------');
    const newChannel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    const result = await this.channelUserService.findAllUsersInChannelWithoutMe(
      newChannel,
    );
    let all = {
      owner: {},
      admins: [],
      users: [],
      usersNumber: 0,
      adminsNumber: 0,
    };
    for (let i = 0; i < result.length; i++) {
      let newStat = null;
      if (result[i].ban == true) newStat = 'ban';
      else if (result[i].mute == true) newStat = 'mute';

      let object = {
        id: result[i].user.id,
        username: result[i].user.username,
        avatar: result[i].user.avatar,
        is_online: result[i].user.is_online,
        userType: result[i].userType,
        stat: newStat,
      };
      if (result[i].userType == UserType.OWNER) {
        all.owner = object;
      } else if (result[i].userType == UserType.ADMIN) {
        all.admins.push(object);
      } else all.users.push(object);
    }
    all.adminsNumber = all.admins.length;
    all.usersNumber = all.users.length;
    return all;
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
    await this.kickUserFormChannelConversation(newChannel.id, newUser.id);
    if (newUser.id === newChannel.owner.id) {
      const users = await this.channelUserService.findAllUsersInChannel(
        newChannel,
        newUser,
      );
      await Promise.all(
        users.map(async (user) => {
          await this.kickUserFormChannelConversation(
            newChannel.id,
            user.user.id,
          );
        }),
      );
      return await this.removeChannel(channelId);
    }
    await this.channelService.updateNumberOfMembers(
      newChannel.id,
      --newChannel.members,
    );
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
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!channel) return { status: 500, message: 'Channel not found' };
    const chanelUser = await this.findChannelUser(channelId, myId);
    if (!chanelUser)
      return { status: 500, message: 'This user is not found in this channel' };
    return await this.channelUserService.updateToBeAdmin(chanelUser.id);
  }

  async changeAdminToBeUserInChannel(channelId: number, myId: number) {
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!channel) return { status: 500, message: 'Channel not found' };
    const chanelUser = await this.findChannelUser(channelId, myId);
    if (!chanelUser)
      return { status: 500, message: 'This user is not found in this channel' };
    return await this.channelUserService.updateToBeUser(chanelUser.id);
  }

  async kickUserFormChannelConversation(channelId: number, myId: number) {
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!channel) return { status: 500, message: 'Channel not found' };
    const conversation: Conversation =
      await this.conversationService.findConversationOfChannel(channelId);
    const conversationUser =
      await this.conversationUserService.findConversationUser(
        conversation.id,
        myId,
      );
    if (conversationUser)
      return await this.conversationUserService.remove(conversationUser);
  }

  async muteUserInChannel(channelId: number, myId: number, body) {
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!channel) return { status: 500, message: 'Channel not found' };
    const chanelUser = await this.findChannelUser(channelId, myId);
    if (!chanelUser)
      return { status: 500, message: 'This user is not found in this channel' };
    if (chanelUser.ban == true) {
      console.log('This user is already banned');
      return { status: 500, message: 'This user is already banned' };
    }
    chanelUser.mute = true;
    chanelUser.timeOfOperation = new Date();
    if (body.time > 0) chanelUser.period = body.time;
    return await this.channelUserService.updateMute(chanelUser.id, chanelUser);
  }

  async banUserInChannel(channelId: number, myId: number, body) {
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!channel) return { status: 500, message: 'Channel not found' };
    const chanelUser = await this.findChannelUser(channelId, myId);
    if (!chanelUser)
      return { status: 500, message: 'This user is not found in this channel' };
    chanelUser.ban = true;
    chanelUser.timeOfOperation = new Date();
    if (body.time > 0) chanelUser.period = body.time;
    await this.messageService.updateHiddenToBeTrue(
      channel.conversation.id,
      myId,
    );
    await this.kickUserFormChannelConversation(channelId, myId);
    return await this.channelUserService.updateBan(chanelUser.id, chanelUser);
  }

  async removeBanUserInChannel(channelId: number, myId: number) {
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!channel) return { status: 500, message: 'Channel not found' };
    const chanelUser = await this.findChannelUser(channelId, myId);
    if (!chanelUser)
      return { status: 500, message: 'This user is not found in this channel' };
    await this.messageService.updateHiddenToBeFalse(
      channel.conversation.id,
      myId,
    );
    return await this.leavesTheChannel(channelId, myId);
  }

  async removeMuteUserInChannel(channelId: number, myId: number) {
    const channel: Channel = await this.channelService.findChannelById(
      channelId,
    );
    if (!channel) return { status: 500, message: 'Channel not found' };
    const chanelUser = await this.findChannelUser(channelId, myId);
    if (!chanelUser)
      return { status: 500, message: 'This user is not found in this channel' };
    return await this.channelUserService.removeMute(chanelUser.id);
  }

  async removeChannel(id: number) {
    const channel = await this.channelService.findChannelById(id);
    if (!channel) return { status: 500, message: 'channel not found' };
    const conversation: Conversation =
      await this.conversationService.findConversationOfChannel(channel.id);
    await this.conversationService.remove(conversation);
    return await this.channelService.remove(channel);
  }

  async UpdateChannelPassword(
    channelId: number,
    body: UpdatePasswordChannel,
    myId: number,
  ) {
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
          // console.log(user.user);
          await this.kickUserFormChannelConversation(channel.id, user.user.id);
          await this.leavesTheChannel(channelId, user.user.id);
        }
      }),
    );
    return { status: 200, message: 'password is updated' };
  }

  // TwoFactorAuthenticationRegister

  async TwoFactorAuthenticationRegister(userId: number) {
    const user =  await this.usersService.findOneById(userId);
    if(!user.twoFactor)
    {
      const temp_secret = speakeasy.generateSecret();
      await this.usersService.update(userId, { secret: temp_secret, twoFactor:true});
      return { status: 201, secret: temp_secret.base32 };
    }
    return {status: 500, message: 'TwoFactor is already activated'}
  }

  async removeTwoFactorAuthentication(userId: number) {
    const user =  await this.usersService.findOneById(userId);
    if(user.twoFactor)
    {
      await this.usersService.update(userId, { secret: null, twoFactor:false});
      return {status: 200, message: "TwoFactor is desactivated"}
    }
    return {status: 500, message: 'TwoFactor is not activated'}
  }

  async TwoFactorAuthenticationVerify(userId: number, token: string) {
    const user: User = await this.usersService.findOneById(userId);
    const object = JSON.parse(user.secret);
    console.log('two factor');
    console.log(object);
    
    console.log('two factor');
    const secret = object.base32;
    
    // console.log(secret);
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
    });
    console.log('-----------------------');
    console.log(verified);
    console.log('-----------------------');
    
    if (verified) {
      console.log('fen wsalto');
      
      await this.usersService.update(userId, { isVerified: true });
      return true;
    } else return false;
  }

  async TwoFactorAuthenticationValidate(userId: number, token: string) {
    const user: User = await this.usersService.findOneById(userId);
    const object = JSON.parse(user.secret);
    const secret = object.base32;
    // console.log(secret);
    const tokenValidates = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });
    if (tokenValidates) {
      return true ;
    } else return false;
  }

  // block
  async blockUser(myId: number, userId: number) {
    const block = await this.usersService.findOneById(userId);
    if (typeof block === undefined) return { error: 'error' };
    const me = await this.usersService.findOneByIdWithRelation(myId, {
      relations: ['block'],
    });
    const friends: Friend[] = await this.friendsService.findTwoFriends(
      myId,
      userId,
    );
    if (friends) await this.deleteFriend(myId, userId);
    if (me.block.find((blockUser) => blockUser.block?.id == userId)) {
      console.log('this user is already in the list');
      return { status: 500, message: 'this users is already in the list' };
    }
    const newBlock: Block = new Block();
    newBlock.user = me;
    newBlock.block = block;
    await this.blockService.save(newBlock);
    return { stats: 200, message: 'user is added in the list of blocking' };
  }

  async deleteBlock(myId: number, blockId: number) {
    try {
      const blockUser: User = await this.usersService.findOneById(blockId);
      if (!blockUser) return { status: 500, message: 'this user is not fount' };
      const me: User = await this.usersService.findOneById(myId);
      const block = await this.blockService.findBlockUser(me, blockUser);
      if (block) return await this.blockService.remove(block);
      return { status: 500, message: 'error' };
    } catch (err) {
      return err;
    }
  }

  //messages
  async updateMessagesToBeHidden(conversationId: number, senderId: number) {
    return await this.messageService.updateHiddenToBeTrue(
      conversationId,
      senderId,
    );
  }

  // notifications

  async findMyRequestsNotifications(myId: number) {
    const notifications: Notification[] =
      await this.notificationsService.findMyRequestsNotifications(myId);
    if (!notifications) return notifications;
    const check = notifications.find((notification) => {
      return notification.verified == false;
    });
    let verified: Boolean = false;
    if (!check) {
      verified = true;
    } else
      await this.notificationsService.updateMyRequestNotificationsToBeVerified(
        myId,
      );
    return { verified, notifications };
  }

  async findMyConversationsNotifications(userId: number) {
    const notifications: Notification[] =
      await this.notificationsService.findMyConversationsNotifications(userId);
    if (!notifications) return notifications;
    const check = notifications.find((notification) => {
      return notification.verified == false;
    });
    let verified: Boolean = false;
    if (!check) {
      verified = true;
    } else
      await this.notificationsService.updateMyConversationsNotificationsToBeVerified(
        userId,
      );
    return { verified, notifications };
  }
}
