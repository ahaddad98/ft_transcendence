import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Game } from 'src/core/entities/game.entity';

@Injectable()
export class GameService extends TypeOrmCrudService<Game> {
  repository: any;
  userservice: UserService;

  constructor(@InjectRepository(Game) repository, userservice: UserService) {
    super(repository);
    this.repository = repository;
    this.userservice = userservice;
  }

  async findAll(): Promise<Game[]> {
    return await this.repository.find();
  }

  async Invite(
    username1: string,
    username2: string,
    map: string,
  ): Promise<Game> {
    let game = new Game();
    game.userId1 = await this.userservice.getIdbyName(username1);
    game.userId2 = await this.userservice.getIdbyName(username2);
    game.user1 = await this.userservice.findOneById(game.userId1);
    game.created_at = new Date();
    game.updated_at = new Date();
    game.is_accepted_by_user2 = false;
    game.is_rejected_by_user2 = false;
    game.is_finished = false;
    game.is_started = false;
    game.price = 0;
    game.map = map;
    return await this.repository.save(game);
  }

  async is_invited(id: number): Promise<Game> {
    const user = await this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.user2.id = :id', { id: id })
      .andWhere('game.is_accepted_by_user2 = :is_accepted_by_user2', {
        is_accepted_by_user2: false,
      })
      .andWhere('game.is_finished = :is_finished', { is_finished: false })
      .andWhere('game.is_started = :is_started', { is_started: false })
      .getOne();
    return user;
  }

  async confirmInvitation(id: number, idgame: number): Promise<Game> {
    this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.id = :id', { id: idgame })
      .where('game.is_accepted_by_user2 = :is_accepted_by_user2', {
        is_accepted_by_user2: false,
      })
      .where('game.is_finished = :is_finished', { is_finished: false })
      .where('game.is_started = :is_started', { is_started: false })
      .update({
        is_accepted_by_user2: true,
        is_started: true,
        TimeBegin: new Date(),
        TimeEnd: new Date(),
        is_finished: false,
      })
      .execute();
    const user = await this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.id = :id', { id: idgame })
      .getOne();
    return user;
  }

  async rejectInvitation(id: number, idgame: number): Promise<Game> {
    const user = await this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.id = :id', { id: idgame })
      .where('game.is_accepted_by_user2 = :is_accepted_by_user2', {
        is_accepted_by_user2: false,
      })
      .where('game.is_finished = :is_finished', { is_finished: false })
      .where('game.is_started = :is_started', { is_started: false })
      .update({
        is_rejected_by_user2: true,
        is_finished: true,
        TimeEnd: new Date(),
      })
      .execute();
    return user;
  }

  async currentGames() {
    const user = await this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.is_accepted_by_user2 = :is_accepted_by_user2', {
        is_accepted_by_user2: true,
      })
      .andWhere('game.is_finished = :is_finished', { is_finished: false })
      .andWhere('game.is_started = :is_started', { is_started: true })
      .getMany();

    let games = [];
    // console.log(user);
    if (user.length > 0) {
      for (let i = 0; i < user.length; i++) {
        // console.log(user[i].user1.username);
        if (user[i].user2.name !== null) {
          let game = {
            key: user[i].id,
            User1: [user[i].user1.name, user[i].user1.image],
            User2: [user[i].user2.name, user[i].user2.image],
            Time: user[i].TimeBegin,
          };
          games.push(game);
        }
      }
    }
    return games;
  }

  async is_waiting(id: number): Promise<Game> {
    const user = await this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.user1.id = :id', { id: id })
      .andWhere('game.is_accepted_by_user2 = :is_accepted_by_user2', {
        is_accepted_by_user2: true,
      })
      .andWhere('game.is_finished = :is_finished', { is_finished: false })
      .andWhere('game.is_started = :is_started', { is_started: true })
      .orderBy('game.created_at', 'DESC')
      .getOne();
    return user;
  }

  async finishGame(id: number, winner: number, json: string): Promise<Game> {
    this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.id = :id', { id: id })
      .andWhere('game.is_accepted_by_user2 = :is_accepted_by_user2', {
        is_accepted_by_user2: true,
      })
      .andWhere('game.is_finished = :is_finished', { is_finished: false })
      .andWhere('game.is_started = :is_started', { is_started: true })
      .update({
        is_finished: true,
        TimeEnd: new Date(),
        winner: winner,
        price: 100,
        json_map: json,
      })
      .execute();
    const game = await this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.id = :id', { id: id })
      .getOne();
    const users = await this.userservice.userRepositor.findOne({ id: winner });
    users.wins = users.wins + 1;
    await this.userservice.userRepositor.save(users);
    // console.log(game);
    if (game.user1.id !== winner) {
      let user: any = await this.userservice.userRepositor.findOne({
        id: game.user1.id,
      });
      user.loses = user.loses + 1;
      await this.userservice.userRepositor.save(user);
    } else {
      let user: any = await this.userservice.userRepositor.findOne({
        id: game.user2.id,
      });
      user.loses = user.loses + 1;
      await this.userservice.userRepositor.save(user);
    }

    return await game;
  }

  async watch(id: number): Promise<Game> {
    const user = await this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.id = :id', { id: id })
      .andWhere('game.is_accepted_by_user2 = :is_accepted_by_user2', {
        is_accepted_by_user2: true,
      })
      .andWhere('game.is_finished = :is_finished', { is_finished: false })
      .andWhere('game.is_started = :is_started', { is_started: true })
      .getOne();
    return user;
  }

  //matchmaking
  async matchmaking(id: number, map: string): Promise<Game> {
    const user = await this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.user2.id IS NULL', {})
      .andWhere('game.is_accepted_by_user2 = :is_accepted_by_user2', {
        is_accepted_by_user2: false,
      })
      .andWhere('game.is_finished = :is_finished', { is_finished: false })
      .andWhere('game.is_started = :is_started', { is_started: false })
      .andWhere('game.map = :map', { map: map })
      .orderBy('game.created_at', 'DESC')
      .getOne(); ///
    if (user) {
      let t = await this.repository
        .createQueryBuilder('game')
        .update({
          is_accepted_by_user2: true,
          is_started: true,
          TimeBegin: new Date(),
          updated_at: new Date(),
          TimeEnd: new Date(),
          is_finished: false,
          user2: await this.userservice.findOneById(id),
          userId2: id,
        })
        .execute();
      return await this.repository
        .createQueryBuilder('game')
        .leftJoinAndSelect('game.user1', 'user1')
        .leftJoinAndSelect('game.user2', 'user2')
        .where('game.id = :id', { id: user.id })
        .getOne();
    } else {
      const game = new Game();
      game.user1 = await this.userservice.findOneById(id);
      game.userId1 = id;
      game.is_accepted_by_user2 = false;
      game.is_finished = false;
      game.is_started = false;
      game.TimeBegin = new Date();
      game.TimeEnd = new Date();
      game.created_at = new Date();
      game.updated_at = new Date();
      game.winner = 0;
      game.price = 100;
      game.map = map;
      return await this.repository.save(game);
    }
  }

  async history(id: number): Promise<Game[]> {
    const user = await this.repository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.user1', 'user1')
      .leftJoinAndSelect('game.user2', 'user2')
      .where('game.user1.id = :id', { id: id })
      .orWhere('game.user2.id = :id', { id: id })
      .orderBy('game.created_at', 'DESC')
      .getMany();
    return user;
  }
}
