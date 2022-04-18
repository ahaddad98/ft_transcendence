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
  
  @WebSocketGateway(3081,{ cors: { origin: '*' } })
  export class ChannelGateway
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
  
    @SubscribeMessage('eventChannel')
    handleEventChannel(client: any, payload: any) {
      this.server.to(payload.id.toString()).emit('newEventChannel', payload);
    }

    @SubscribeMessage('updateConversationChannel')
    updateConversation(client: any, payload: any) {
      this.server.to(payload.id.toString()).emit('newUpdateConversationChannel', payload);
    }
  
    @SubscribeMessage('sendMessageChannel')
    handleSendMessageChannel(client: any, payload: any) {
      this.server.to(payload.id.toString()).emit('newMessageChannel', payload);
    }
  
    @SubscribeMessage('joinChannelConversation')
    joinChannelConversation(client: any, payload: any) {
      console.log('im in join channelConversation');
      
      this.server.socketsJoin(payload.toString());
    }

    @SubscribeMessage('leaveRoom')
    leaveRoom(client: any, payload: any) {
      console.log('im in leaveRoom');
      
      client.broadcast.to(payload.id.toString()).emit('newEventChannel', payload);
      this.server.socketsLeave(payload.id.toString());
      console.log('socket leav');
      console.log('after');
      
    }

    @SubscribeMessage('joinChannel')
    joinChannel(client: any, payload: any) {
      console.log('im in join channel id: ' + payload);
      this.server.socketsJoin(payload.toString());
      this.server.to(payload.toString()).emit('newEventChannel', payload);
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
  