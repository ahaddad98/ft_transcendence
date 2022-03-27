import { Controller, Get, Post, Req } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Param } from '@nestjs/common';
import { Game } from 'src/core/entities/game.entity';
import { GameService } from 'src/services/use-cases/game/game.service';

@Crud({
    model: {
        type: Game,
    },
})
@Controller('game')
export class GameController implements CrudController<Game> {

    constructor(public service: GameService) {
    }

    get base(): CrudController<Game> {
        return this;
    }

    getService() {
        return this.service;
    }

    getMany(request: any) {
        return this.base.getManyBase(request);
    }

    getOne(request: any) {
        return this.base.getOneBase(request);
    }

    createOne(request: any, data: any) {
        return this.base.createOneBase(request, data);
    }

    @Get('/all')
    async findAll() {
        return await this.service.findAll();
    }

    @Post('/invite')
    async Invite(@Req() req) {
        return await this.service.Invite(req.body.username1, req.body.username2, req.body.map);
    }

    @Get("/is_invited/:id")
    async is_invited(@Param("id") id: number) {
        return await this.service.is_invited(id);
    }

    @Get("/invited/confirm/:id/:idgame")
    async confirm(@Param("id") id: number, @Param("idgame") idgame: number) {
        return await this.service.confirmInvitation(id, idgame);
    }

    @Get("/invited/reject/:id/:idgame")
    async reject(@Param("id") id: number, @Param("idgame") idgame: number) {
        return await this.service.rejectInvitation(id, idgame);
    }

    //current games
    @Get("/current/")
    async current() {
        return await this.service.currentGames();
    }

    @Get("/is_waiting/:id")
    async is_begin(@Param("id") id: number) 
    {
        return await this.service.is_waiting(id);
    }

    @Post("/finish/:id/:winner")
    async finishGame(@Param("id") id: number, @Param("winner") winner: number, @Req() req) {
        return await this.service.finishGame(id, winner, req.body.map);
    }

    // whach game
    @Get("/watch/:id")
    async watch(@Param("id") id: number) {
        return await this.service.watch(id);
    }

    //matchmaking
    @Get("/matchmaking/:id/:map")
    async matchmaking(@Param("id") id: number, @Param("map") map: string) {
        return await this.service.matchmaking(id,map);
    }

    //history games
    @Get("/history/:id")
    async history(@Param("id") id: number) 
    {
        return await this.service.history(id);
    }
}
