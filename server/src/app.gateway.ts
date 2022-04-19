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
import { UserService } from './services/use-cases/user/user.service';
// import *  'src/services/use-cases/game/game.module';
import { Connection } from 'typeorm';

// add  

class Games {
  id: number;
  user1: number;
  user2: number;
  is_started: boolean;
  user1_accepted: boolean;
  user2_accepted: boolean;
  is_finished: boolean;
  socket1: string;
  socket2: string;
  score1: number;
  score2: number;

  constructor(
    id: number,
    user1: number,
    user2: number,
    is_started: boolean,
    user1_accepted: boolean,
    user2_accepted: boolean,
    socket1: string,
    score1: number,
    score2: number,
  ) {
    this.id = id;
    this.user1 = user1;
    this.user2 = user2;
    this.is_started = is_started;
    this.user1_accepted = false;
    this.user2_accepted = false;
    this.socket1 = socket1;
    this.score1 = score1;
    this.score2 = score2;
  }
}

@WebSocketGateway(3080, { cors: { origin: '*' } })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  usersConnect:string[];
  i: number = 0;
  game: Games[] = [];
  gameService: GameService;
  userService: UserService;
  axios: any;
  // repo:Repository<Game>;

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
    this.usersConnect = new Array();

    this.axios = require('axios');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Socket connected ${client.id}`);
  }

  handleDisconnect(client: Socket) 
  {
    this.logger.log(`Socket desconnected ${client.id}`);
    // this.usersConnect = this.usersConnect.filter((user) => user != client.id);

    for (let i = 0; i < this.game.length; i++) {
      // this.connect_users
      // console.log("Currents Games",t his.game[i]);
      if (this.game[i].socket1 == client.id ) {
        let url = process.env.FRONTEND_URL+':3001/game/quit/' + this.game[i].id + '/'+this.game[i].user2;
        this.axios.post(url,
          {
            user1_score: this.game[i].score1, 
            user2_score: this.game[i].score2,
            map:"none"
          }).then(response => {
        });
        this.server.emit('QuitgameClient', { gameid: this.game[i].id, userId: this.game[i].user2 });
      }
      if(this.game[i].socket2 == client.id){
        let url = process.env.FRONTEND_URL+':3001/game/quit/' + this.game[i].id + '/'+this.game[i].user1;
        this.axios.post(url,
          {
            user1_score: this.game[i].score1,
            user2_score: this.game[i].score2,
            map:"none"
          }).then(response => {
          this.usersConnect = response.data;
        });
        this.server.emit('QuitgameClient', { gameid: this.game[i].id, userId: this.game[i].user1 });
      }
    }
  }

  @SubscribeMessage('QuitgameServer')
  async onQuitgame(client: Socket, payload: any) {
    this.server.emit('QuitgameClient', payload);
  }

  @SubscribeMessage('DataToServer')
  handleMessage(client: Socket, payload: any): void {

    client.broadcast.emit('DataToClient', payload);
  }

  @SubscribeMessage('DataToServer2')
  handleBall(client: Socket, payload: any): void {
    client.broadcast.emit('DataToClient2', payload);
  }

  @SubscribeMessage('BallServer')
  connect_users(client: Socket, payload: any): void {
    //update score of users 
    this.game.forEach(element => {
      if (element.id == payload.gameid) {
          element.score1 = payload.score1;
          element.score2 = payload.score2;
      }
    });
    // console.log("Ball server",payload);
    client.broadcast.emit('BallClient', payload);
  }

  @SubscribeMessage('ConnectServer')
  connect_users2(client: Socket, payload: any): void {
    // console.log(this.usersConnect.length);
    // this.usersConnect.push(client.id);
    let game_id = this.game.findIndex((game) => game.id == payload.GameInfo.id);
    if (game_id == -1) {
      this.game.push(
        new Games(
          payload.GameInfo.id,
          payload.GameInfo.userId1,
          payload.GameInfo.userId2,
          false,
          true,
          false,
          client.id,
          0,
          0
        ),
      );
    } else if(this.game[game_id].is_started == false)
     {
      if (
        this.game[game_id].user1 == payload.idUser ||
        this.game[game_id].user2 == payload.idUser ||
        this.game[game_id].user2 == 0
      ) {
        this.game[game_id].is_started = true;
        this.game[game_id].user1_accepted = true;
        this.game[game_id].user2_accepted = true;
        this.game[game_id].user2 = payload.idUser;
        this.game[game_id].socket2 = client.id;
        if (this.game[game_id].user2 == payload.idUser) 
        {
          payload.GameInfo.is_started = true;
          payload.GameInfo.user1_accepted = true;
          payload.GameInfo.user2_accepted = true;
        }
      }
    }
    game_id = this.game.findIndex((game) => game.id == payload.GameInfo.id);
    this.server.emit('ConnectClient', {
      data:payload.GameInfo,
      idUser:payload.idUser,
    }
      );
  }

  @SubscribeMessage('PauseServer')
  pause(client: Socket, payload: any): void {
    this.server.emit('PauseClient', payload);
  }

  @SubscribeMessage('GameOverServer')
  gameOver(client: Socket, payload: any): void {
    this.game = this.game.filter((game) => game.id != payload.idgame);
    this.server.emit('GameOverClient', payload);
  }

  @SubscribeMessage('notificationServer')
  notification(client: Socket, payload: any): void {
    this.server.emit('notificationClient', payload);
  }
}
