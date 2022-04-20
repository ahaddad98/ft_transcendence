import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3080,{ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{

  users:{userId:number, socketId: string} [];

  private logger: Logger = new Logger('AppGateway');
  private addUser = (userId: number, socketId: string) => {
      !this.users.some(user => user.userId === userId) && this.users.push({userId, socketId});
  };

  private removeUser = (socketId: string) => {
      this.users = this.users.filter(user => user.socketId !== socketId);
  };

  private getUser = (userId: number) => {
      return this.users.find(user => user.userId == userId);
  };

  @WebSocketServer() server: Server;


  afterInit(server: Server) {
    this.logger.log('Initialized');
    this.users = new Array();
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client desconnected ${client.id}`);
    this.removeUser(client.id);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: any, payload: any) {
    const user = this.getUser(payload.receiver.id);
    if(user?.userId)
    this.server.to(user.socketId).emit('newMessage', payload);
  }

  @SubscribeMessage('sendMessageChannel')
  handleSendMessageChannel(client: any, payload: any) {
    this.server.to(payload.id.toString()).emit('newMessageChannel', payload);
  }

  @SubscribeMessage('joinChannel')
  joinChannel(client: any, payload: any) {
    
    this.server.socketsJoin(payload.toString());
  }
  
  @SubscribeMessage('addUser')
  handleUser(client: any, payload: any) {
    if(payload)
    {
      this.addUser(payload, client.id);
      return this.users;
    }
  }
}
