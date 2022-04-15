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
  
  @WebSocketGateway(6209,{ cors: { origin: '*' } })
  export class UsersGateway
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
  
    @SubscribeMessage('changeStat')
    handleSendMessage(client: any, payload: any) {
      
      const user = this.getUser(payload.user2.id);
      if(user?.userId)
        this.server.to(user.socketId).emit('newStat', payload);
    }

    @SubscribeMessage('changeStatOfFriend')
    changeStatOfFriend(client: any, payload: any) {
      const user = this.getUser(payload.user2.id);
      if(user?.userId)
        this.server.to(user.socketId).emit('newStatFriend', payload);
    }
    
    @SubscribeMessage('addUser')
    handleUser(client: any, payload: any) {
      this.addUser(payload, client.id);
      if(payload)
      {
        this.addUser(payload, client.id);
        return this.users;
      }
    }
  }
  