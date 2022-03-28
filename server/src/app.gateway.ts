import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GameService } from './services/use-cases/game/game.service';

class Game {
  id: number;
  user1: number;
  user2: number;
  is_started: boolean;
  user1_accepted: boolean;
  user2_accepted: boolean;

  constructor(
    id: number,
    user1: number,
    user2: number,
    is_started: boolean,
    user1_accepted: boolean,
    user2_accepted: boolean,
  ) {
    this.id = id;
    this.user1 = user1;
    this.user2 = user2;
    this.is_started = is_started;
    this.user1_accepted = false;
    this.user2_accepted = false;
  }
}

@WebSocketGateway(3080, { cors: { origin: '*' } })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');
  usersConnect = [];
  i: number = 0;
  game: Game[] = [];
  gameService: GameService;

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected ${client.id}`);
    this.usersConnect.push(client.id);
    console.log(this.usersConnect.length);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client desconnected ${client.id}`);
    this.usersConnect = this.usersConnect.filter((user) => user !== client.id);
    console.log(this.usersConnect.length);
  }

  @SubscribeMessage('DataToServer')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('DataToClient', payload);

    // console.log(payload);
  }

  @SubscribeMessage('DataToServer2')
  handleBall(client: Socket, payload: any): void {
    this.server.emit('DataToClient2', payload);
  }

  @SubscribeMessage('BallServer')
  connect_users(client: Socket, payload: any): void {
    this.server.emit('BallClient', payload);
  }

  @SubscribeMessage('ConnectServer')
  connect_users2(client: Socket, payload: any): void {
    // console.log(payload);
    let game_id = this.game.findIndex((game) => game.id == payload.GameInfo.id);
    // console.log(this.game[game_id]);
    // console.log(payload);
    // console.log(payload);
    if (game_id == -1) {
      this.game.push(
        new Game(
          payload.GameInfo.id,
          payload.GameInfo.userId1,
          payload.GameInfo.userId2,
          false,
          true,
          false,
        ),
      );
    } else {
      if (
        this.game[game_id].user1 == payload.idUser ||
        this.game[game_id].user2 == payload.idUser ||
        this.game[game_id].user2 == 0
      ) {
        this.game[game_id].is_started = true;
        this.game[game_id].user1_accepted = true;
        this.game[game_id].user2_accepted = true;
        this.game[game_id].user2 = payload.idUser;
        if (this.game[game_id].user2 == payload.idUser) {
          payload.GameInfo.is_started = true;
          payload.GameInfo.user1_accepted = true;
          payload.GameInfo.user2_accepted = true;
        }

        // ;
      }
    }
    game_id = this.game.findIndex((game) => game.id == payload.GameInfo.id);

    // if(

    this.server.emit('ConnectClient', payload.GameInfo);
  }

  @SubscribeMessage('PauseServer')
  pause(client: Socket, payload: any): void {
    this.server.emit('PauseClient', payload);
  }

  @SubscribeMessage('GameOverServer')
  gameOver(client: Socket, payload: any): void {
    console.log(payload);
    this.server.emit('GameOverClient', payload);
  }
}
