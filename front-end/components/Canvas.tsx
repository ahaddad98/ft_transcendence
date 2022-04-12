import Avatar from 'antd/lib/avatar/avatar';
import React, { useRef, useEffect, useContext } from 'react'
import { Socket, io } from 'socket.io-client';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import Dialog from './match_matching';
import axios from "axios";
import { useMyContext } from './ContextProvider';
import { Result } from 'antd';
import Cookies from 'cookie';


export class player {
    score: number;
    paddle_x: number;
    paddle_y: number;
    paddle_width: number;
    paddle_height: number;
    paddle_speed: number;
    ctx: CanvasRenderingContext2D;
    color: string;
    constructor(
        score: number,
        paddle_x: number,
        paddle_y: number,
        paddle_width: number,
        paddle_height: number,
        paddle_speed: number,
        ctx: CanvasRenderingContext2D,
        color: string
    ) {
        this.score = score;
        this.paddle_x = paddle_x;
        this.paddle_y = paddle_y;
        this.paddle_width = paddle_width;
        this.paddle_height = paddle_height;
        this.paddle_speed = paddle_speed;
        this.ctx = ctx;
        this.color = color;
    }

    draw_padle() {
        this.ctx.beginPath();
        this.ctx.rect(
            this.paddle_x,
            this.paddle_y,
            this.paddle_width,
            this.paddle_height
        );
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    public get _paddle_x() {
        return this.paddle_x;
    }

    public get _paddle_y() {
        return this.paddle_y;
    }

    public set _Paddle_x(value: number) {
        this.paddle_x = value;
    }

    public set _Paddle_y(value: number) {
        this.paddle_y = value;
    }

    public get _paddle_height() {
        return this.paddle_height;
    }
    public set _score(value: number) {
        this.score += value;
    }

    public get _score() {
        return this.score;
    }

    Tojson() {
        return (JSON.stringify(this));
    }

    ToJson() {
        return (
            {
                "paddle_x": this.paddle_x,
                "paddle_y": this.paddle_y,
                "paddle_width": this.paddle_width,
                "paddle_height": this.paddle_height,
                "paddle_speed": this.paddle_speed,
                "ctx": this.ctx,
                "color": this.color,
            });
    }
}

export class ball {
    ball_x: number;
    ball_y: number;
    ball_radius: number;
    velocity_x: number;
    velocity_y: number;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    color: string;
    constructor(
        ctx: CanvasRenderingContext2D,
        ball_x: number,
        ball_y: number,
        ball_radius: number,
        velocity_x: number,
        velocity_y: number,
        color: string,
        canvas: HTMLCanvasElement
    ) {
        this.ball_x = ball_x;
        this.ball_y = ball_y;
        this.ball_radius = ball_radius;
        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;
        this.ctx = ctx;
        this.color = color;
        this.canvas = canvas;
    }

    draw_ball() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball_x, this.ball_y, this.ball_radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    calculate_coordinates_of_ball_on_paddle(Player: player) {
        var paddle_center = Player.paddle_y + Player.paddle_height / 2;
        var ball_center = this.ball_y + this.ball_radius;
        var distance = paddle_center - ball_center;
        var y_coordinate_of_ball_on_paddle = distance / Player.paddle_height * (this.canvas.height);
        return y_coordinate_of_ball_on_paddle;
    }


    bar_collision(Bar: player) {
        if (this._ball_x + this.velocity_x < Bar.paddle_x + Bar.paddle_width && this._ball_x + this.velocity_x > Bar.paddle_x && this.ball_y + this.velocity_y > Bar.paddle_y && this.ball_y + this.velocity_y < Bar.paddle_y + Bar.paddle_height) {
            this.velocity_x = -this.velocity_x;
            this.velocity_x += 0.5;
        }
    }

    bot(p: player) {
        var y_coordinate_of_ball_on_paddle = this.calculate_coordinates_of_ball_on_paddle(p);
        if (y_coordinate_of_ball_on_paddle + 10 < this.ball_y + this.ball_radius) {
            p.paddle_y += 8;
        }
        else if (y_coordinate_of_ball_on_paddle > this.ball_y + this.ball_radius) {
            p.paddle_y -= 8;
        }
        if (p.paddle_y + p._paddle_height > this.canvas.height) {
            p.paddle_y = this.canvas.height - p._paddle_height;
        }
        this.bar_collision(p);
    }


    public get _ball_x() {
        return this.ball_x;
    }

    public get _ball_y() {
        return this.ball_y;
    }

    public get _velocity_x() {
        return this.velocity_x;
    }

    public get _velocity_y() {
        return this.velocity_y;
    }

    public set _ball_x(value) {
        this.ball_x = value;
    }

    public set _ball_y(value) {
        this.ball_y = value;
    }

    public set _velocity_x(value) {
        this.velocity_x = value;
    }

    public set _velocity_y(value) {
        this.velocity_y = value;
    }

    public get _ball_radius() {
        return this.ball_radius;
    }
    json: string = "";

    Json() {
        this.json = '{';
        this.json += '"x": ' + this.ball_x + ',';
        this.json += '"y": ' + this.ball_y + ',';
        this.json += '"radius": ' + this.ball_radius + ',';
        this.json += '"color": "' + this.color + '",';
        this.json += '"dx": ' + this.velocity_x + ',';
        this.json += '"dy": ' + this.velocity_y + '';
        this.json += '}';
        return this.json;
    }
}
// const context = useMyContext();
var finished = false;
export class Game {

    gameid: number = 0;
    canvas: HTMLCanvasElement;
    ctx: any;
    paddle_right: player;
    paddle_left: player;
    uppress: boolean;
    downpress: boolean;
    center_rec: player;
    uppress1: boolean;
    downpress1: boolean;
    _ball: ball = null;
    socket: Socket;
    sender: string;
    myId: string;
    player: number;
    email1: string;
    email2: string;
    data: any;
    pause: boolean;
    windos: any;
    // gamePlay: GPEXPORT;
    time: number;
    bar: player;
    json: string;
    MyData: any;
    paused_id: number;
    p_width: number;
    p_height: number;
    p_start: number;
    b_radius: number;
    p_speed: number;
    b_speed: number;

    constructor(canvas: HTMLCanvasElement, data: any, socket: Socket, MyData: any) {

        this.canvas = canvas;
        // console.log("This freacking data",data['user2']['email']);
        if (canvas != null && data != undefined) {
            this.MyData = MyData;
            this.canvas.style.backgroundColor = "black";
            this.canvas.width = (window.innerWidth * 0.5) | 0;
            this.canvas.height = (window.innerHeight * 0.5) | 0;
            this.old_Height = this.canvas.height;
            this.old_Width = this.canvas.width;
            this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
            this.uppress = false;
            this.downpress = false;
            this.uppress1 = false;
            this.data = data;
            this.email1 = this.data['user1']['email'];
            this.pause = false;
            this.email2 = data['user2']['email'];
            this.gameid = this.data['id'];
            this.downpress1 = false;
            this.json = "";
            this.paused_id = -1;
            this.p_width = (this.canvas.width * 0.01) | 0;
            this.p_height = (this.canvas.height * 0.02) | 0;
            this.p_start = this.canvas.width - (this.p_width) - this.p_width;
            this.p_speed = (this.canvas.height * 0.02) | 0;
            {
                // console.log("p_width: " + this.p_width);
                // console.log("p_height: " + this.p_height);
            }
            this.paddle_left = new player(0, this.canvas.width * 0.01, this.canvas.height / 2, this.p_width, this.p_height, this.p_speed, this.ctx, "white");
            this.paddle_right = new player(0, this.p_start, (this.canvas.height) / 2, this.p_width, this.p_height, this.p_speed, this.ctx, "white");
            this.center_rec = new player(0, this.canvas.width / 2, 0, 1, this.canvas.height, 0, this.ctx, "white");
            this.b_radius = (this.canvas.width * 0.01) | 0;
            this.b_speed = 6;
            this._ball = new ball(this.ctx, this.canvas.width / 2, this.canvas.height / 2, this.b_radius, (-1) * this.b_speed, (this.b_speed), "#b9541a", canvas);
            if (this.data.map == "Map3") {
                this.bar = new player(0, this.canvas.width / 2, 0, 10, 120, 0, this.ctx, "red");
            }
            if (this.email1 === this.MyData['email'] || this.email2 === this.MyData['email']) {
                document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
                document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
            }
            document.addEventListener('click', this.homeClick.bind(this), false);
            document.addEventListener('beforeunload', this.beforeUnload.bind(this), false);
            document.addEventListener('unload', this.unloaded.bind(this), false);

            window.onbeforeunload = function () {
                alert('Are you sure you want to leave?');
            };
            this.socket = socket;
            this.player = 0;
            this.paddle_left.score = 0;
            this.paddle_right.score = 0;

            // if (this.data['watch'] === undefined) 
            {
                this.socket.on('DataToClient', (msg) => {
                    if (msg.gameid === this.gameid && this.MyData['id'] !== msg.userId) {
                        if (msg.width > this.canvas.width) {
                            let delta = msg.width / this.canvas.width;
                            this.paddle_right.paddle_x = (msg.paddle.paddle_x / delta);
                        }
                        else if (msg.width < this.canvas.width) {
                            let delta = this.canvas.width / msg.width;
                            this.paddle_right.paddle_x = msg.paddle.paddle_x * delta;


                        }
                        else {
                            this.paddle_right.paddle_x = msg.paddle.paddle_x;
                        }
                        if (msg.height > this.canvas.height) {
                            let delta = msg.height / this.canvas.height;
                            this.paddle_right.paddle_y = msg.paddle.paddle_y / delta;

                        }
                        else if (msg.height < this.canvas.height) {
                            let delta = this.canvas.height / msg.height;
                            this.paddle_right.paddle_y = msg.paddle.paddle_y * delta;
                        }
                        else {
                            this.paddle_right.paddle_y = msg.paddle.paddle_y;
                        }
                    }
                });

                this.socket.on('DataToClient2', (msg) => {
                    if (msg.gameid === this.gameid) {
                        if (msg.width > this.canvas.width) {
                            let delta = msg.width / this.canvas.width;
                            this.paddle_left.paddle_x = (msg.paddle.paddle_x / delta);
                        }
                        else if (msg.width < this.canvas.width) {
                            let delta = this.canvas.width / msg.width;
                            this.paddle_left.paddle_x = msg.paddle.paddle_x * delta;
                        }
                        else if (msg.width === this.canvas.width) {
                            this.paddle_left.paddle_x = msg.paddle.paddle_x;
                        }
                        if (msg.height > this.canvas.height) {
                            let delta = msg.height / this.canvas.height;
                            this.paddle_left.paddle_y = msg.paddle.paddle_y / delta;

                        }
                        else if (msg.height < this.canvas.height) {
                            let delta = this.canvas.height / msg.height;
                            this.paddle_left.paddle_y = msg.paddle.paddle_y * delta;

                        }
                        else {
                            this.paddle_left.paddle_y = msg.paddle.paddle_y;
                        }

                    }
                });
                this.intervalId = null;
                this.socket.on('BallClient', (msg) => {
                    if (msg.gameid === this.gameid && this.email1 === msg.idUser) {

                        if (msg.width > this.canvas.width) {
                            let delta = msg.width / this.canvas.width;
                            this._ball.ball_x = (msg.ball_x / delta);
                        }
                        else if (msg.width < this.canvas.width) {
                            let delta = this.canvas.width / msg.width;
                            this._ball.ball_x = msg.ball_x * delta;
                        }
                        else if (msg.width === this.canvas.width) {
                            this._ball.ball_x = msg.ball_x;
                        }
                        if (msg.height > this.canvas.height) {
                            let delta = msg.height / this.canvas.height;
                            this._ball.ball_y = msg.ball_y / delta;

                        }
                        else if (msg.height < this.canvas.height) {
                            let delta = this.canvas.height / msg.height;
                            this._ball.ball_y = msg.ball_y * delta;

                        }
                        else if (msg.height === this.canvas.height) {
                            this._ball.ball_y = msg.ball_y;
                        }
                        this.paddle_left.score = msg.score1;
                        this.paddle_right.score = msg.score2;
                    }
                });

                this.socket.on('PauseClient', (msg) => {
                    if (msg.gameid === this.gameid) {
                        this.pause = !this.pause;
                        this.paused_id = msg.id;
                    }
                    if (!this.pause) {
                        this.paused_id = -1;
                    }

                });
            }

            this.socket.on('QuitgameClient', (msg) => {
                console.log("QUIT MSG",msg);
                if (msg.gameid === this.gameid && (msg.userId === this.MyData['id'] || msg.userId === this.MyData['id'])) {
                    // axios.post('http://localhost:3001/game/quit/' + this.gameid + '/' + msg.userId,
                    //     {
                    //         map: "none",
                    //     })
                    //     .then(res => {
                    //     });
                    this.pause = true;
                    this.time = 0;
                }

            });

            this.timer();
            let img = new Image();
            img.src = this.data['user2']['avatar'];
            img.onload = () => {
                this.ctx.drawImage(img, this.canvas.width - 70, this.canvas.height - 38, 34, 34);
            }

            let img1 = new Image();
            img1.src = this.data['user1']['avatar'];
            img1.onload = () => {
                this.ctx.drawImage(img1, 50, this.canvas.height - 38, 34, 34);
            }
            // this.gamePlay = new GPEXPORT(this._ball, this.paddle_left, this.paddle_right, this.time);
            this.time = 10;

            setTimeout(() => {
                this.start();
            }, 1000);
        }


        else {
        }
    }

    beforeUnload(event) {
        // alert('Are you sure you want to leave?');
    }

    unloaded(event) {
        // alert('Are you sure you want to leave?');
    }


    intervalId: any;
    timer() {
        this.intervalId = setInterval(() => {
            if (this.pause) {
                this.time--;
                if (this.time <= 0) {
                    let newId: number = -1;
                    if (this.paused_id != this.data['user2']['id']) {
                        this.paddle_left.score = 10;
                        this.draw_winner(this.data['user2']['username']);
                        newId = this.data['user2']['id'];
                    }
                    else {
                        this.paddle_right.score = 10;
                        this.draw_winner(this.data['user1']['username']);
                        newId = this.data['user1']['id'];
                    }

                    axios.post('http://localhost:3001/game/quit/' + this.gameid + '/' + newId,
                        {
                            map: "none",
                        })
                        .then(res => {
                        });
                    cancelAnimationFrame(this.req);
                    clearInterval(this.intervalId);
                }
            }
            else {
                this.time = 10;
            }
        }, 1000);

    }

    onunload() {
        // console.log("[" + this.gameid + "]" + "onunload");
    }

    receiveMessage(data: any) {
        // console.(data);
    }

    keyDownHandler(e: KeyboardEvent) {
        if (e.key === "ArrowUp" || e.key === "Up") {
            this.uppress = true;
        }
        if (e.key === "w" || e.key === "KeyW") {
            this.uppress1 = true;
        }
        if (e.key === "ArrowDown" || e.key === "Down") {
            this.downpress = true;
        }
        if (e.key === "s" || e.key === "KeyS") {
            this.downpress1 = true;
        }
    }

    keyUpHandler(e: KeyboardEvent) {
        if (e.key === "ArrowUp" || e.key === "Up") {
            this.uppress = false;

        }
        if (e.key === "w" || e.key === "KeyW") {
            this.uppress1 = false;
        }
        if (e.key === "ArrowDown" || e.key === "Down") {
            this.downpress = false;
        }
        if (e.key === "s" || e.key === "KeyS") {
            this.downpress1 = false;
        }
        if (e.key === "p" || e.key === "KeyP" || e.key === " ") {
            if (this.paused_id === this.MyData['id'] || this.paused_id === -1) {
                this.socket.emit('PauseServer',
                    {
                        gameid: this.gameid,
                        pause: this.pause,
                        id: this.MyData['id']
                    });
            }
        }
    }

    keyhook() {

        if (this.email1 === this.MyData['email']) {
            if (this.uppress === true) {
                this.paddle_left.paddle_y -= this.canvas.height * 0.01;
                if (this.paddle_left.paddle_y < 0) {
                    this.paddle_left.paddle_y = 0;
                }
                this.socket.emit('DataToServer2',
                    {
                        paddle: this.paddle_left.ToJson(),
                        width: this.canvas.width,
                        height: this.canvas.height,
                        gameid: this.gameid,
                        windowsH: window.innerHeight,
                        windowsW: window.innerWidth,
                        userId: this.MyData['id']
                    }); // push a mesage to the array
            }
            if (this.downpress) {

                this.paddle_left.paddle_y += this.canvas.height * 0.01;
                if (this.paddle_left.paddle_y + this.paddle_left._paddle_height > this.canvas.height) {
                    this.paddle_left.paddle_y = this.canvas.height - this.paddle_left._paddle_height + 1;
                }
                this.socket.emit('DataToServer2',
                    {
                        paddle: this.paddle_left.ToJson(),
                        width: this.canvas.width,
                        height: this.canvas.height,
                        gameid: this.gameid,
                        windowsH: window.innerHeight,
                        windowsW: window.innerWidth,
                        userId: this.MyData['id']
                    });

            }
        }
        if (this.email2 === this.MyData['email']) {
            if (this.uppress1) {
                this.paddle_right.paddle_y -= this.canvas.height * 0.01;

                if (this.paddle_right._paddle_y < 0) {
                    this.paddle_right.paddle_y = 0;
                }
                this.socket.emit('DataToServer',
                    {
                        paddle: this.paddle_right.ToJson(),
                        gameid: this.gameid,
                        width: this.canvas.width,
                        height: this.canvas.height,
                        windowsH: window.innerHeight,
                        windowsW: window.innerWidth,
                    }); // push a mesage to the array

            }
            if (this.downpress1) {

                this.paddle_right.paddle_y += this.canvas.height * 0.01;
                if (this.paddle_right._paddle_y + this.paddle_right._paddle_height > this.canvas.height) //
                {
                    this.paddle_right.paddle_y = this.canvas.height - this.paddle_right._paddle_height + 1;
                }
                this.socket.emit('DataToServer',
                    {
                        paddle: this.paddle_right.ToJson(),
                        gameid: this.gameid,
                        width: this.canvas.width,
                        height: this.canvas.height,
                        windowsH: window.innerHeight,
                        windowsW: window.innerWidth,
                    }) // push a mesage to the array
            }
        }
    }
    // 4 = this.canvas.height  *0.01
    // 40  = (this.canvas.height  *0.1)
    //42 = (this.canvas.height  *0.1) +1
    // 5 = 
    collisionDetection() {
        if (this._ball.ball_y + this._ball._velocity_y < this._ball._ball_radius) {
            this._ball._velocity_y *= -1;
        }
        else if (
            this._ball.ball_y + this._ball._velocity_y >
            this.canvas.height - this._ball._ball_radius
        ) {
            this._ball._velocity_y *= -1;
        }

        if (this._ball.ball_x + this._ball._velocity_x > this.canvas.width - this._ball._ball_radius - this.paddle_right.paddle_width) {
            if (
                this._ball.ball_y > this.paddle_right._paddle_y &&
                this._ball.ball_y < this.paddle_right._paddle_y + this.paddle_right._paddle_height /*+ 8*/
            ) {
                this._ball._velocity_x = -this._ball._velocity_x;
            } else if (this._ball.ball_x + this._ball._velocity_x < this.canvas.width - this._ball.ball_radius) {
                this.paddle_right._score = 1;
                this._ball.ball_x = this.canvas.width / 2;
                this._ball.ball_y = this.canvas.height - this.paddle_right._paddle_height;
                this._ball._velocity_x = this.canvas.height * 0.01;
                this._ball._velocity_y = this.canvas.height * -0.01;
            }
        }
        if (
            this._ball.ball_x + this._ball._velocity_x <
            this._ball._ball_radius + this.paddle_left.paddle_width
        ) {
            if (
                this._ball.ball_y > this.paddle_left._paddle_y &&
                this._ball.ball_y < this.paddle_left._paddle_y + this.paddle_left._paddle_height
            ) {
                this._ball._velocity_x = -this._ball._velocity_x;
            } else if (this._ball.ball_x + this._ball._velocity_x < 10 - this._ball.ball_radius) {
                this.paddle_left._score = 1;
                this._ball.ball_x = this.canvas.width / 2;
                this._ball.ball_y = this.canvas.height - this.paddle_right._paddle_height;
                this._ball._velocity_y = this.canvas.height * -0.01;
                this._ball._velocity_x = this.canvas.height * -0.01;


            }
        }

    }

    draw_footer() {
        // this.ctx.beginPath();
        // this.ctx.rect(0, this.canvas.height , this.canvas.width, 1);
        // this.ctx.fillStyle = "white";
        // this.ctx.fill();
        // this.ctx.closePath();
    }

    old_Height: number;
    old_Width: number;

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.old_Height != this.canvas.height || this.old_Width != this.canvas.width) {
            if (this.old_Height > this.canvas.height) {
                let delta = this.old_Height / this.canvas.height;
                this.paddle_right.paddle_y = this.paddle_right.paddle_y / delta;
            }
            else if (this.old_Height < this.canvas.height) {
                let delta = this.canvas.height / this.old_Height;
                this.paddle_right.paddle_y = this.paddle_right.paddle_y * delta;
            }
            if (this.old_Width > this.canvas.width) {
                let delta = this.old_Width / this.canvas.width;
                this.paddle_right.paddle_x = this.paddle_right.paddle_x / delta;
            }
            else if (this.old_Width < this.canvas.width) {
                let delta = this.canvas.width / this.old_Width;
                this.paddle_right.paddle_x = this.paddle_right.paddle_x * delta;
            }
            if (this.old_Height > this.canvas.height) {
                let delta = this.old_Height / this.canvas.height;
                this.paddle_left.paddle_y = this.paddle_left.paddle_y / delta;
            }
            else if (this.old_Height < this.canvas.height) {
                let delta = this.canvas.height / this.old_Height;
                this.paddle_left.paddle_y = this.paddle_left.paddle_y * delta;
            }
            if (this.old_Width > this.canvas.width) {
                let delta = this.old_Width / this.canvas.width;
                this.paddle_left.paddle_x = this.paddle_left.paddle_x / delta;
            }
            else if (this.old_Width < this.canvas.width) {
                let delta = this.canvas.width / this.old_Width;
                this.paddle_left.paddle_x = this.paddle_left.paddle_x * delta;
            }

            if (this.old_Height > this.canvas.height) {
                let delta = this.old_Height / this.canvas.height;
                this._ball.ball_y = this._ball.ball_y / delta;
            }
            else if (this.old_Height < this.canvas.height) {
                let delta = this.canvas.height / this.old_Height;
                this._ball.ball_y = this._ball.ball_y * delta;
            }
            if (this.old_Width > this.canvas.width) {
                let delta = this.old_Width / this.canvas.width;
                this._ball.ball_x = this._ball.ball_x / delta;
            }
            else if (this.old_Width < this.canvas.width) {
                let delta = this.canvas.width / this.old_Width;
                this._ball.ball_x = this._ball.ball_x * delta;
            }
            this.old_Height = this.canvas.height;
            this.old_Width = this.canvas.width;
        }
        // this.paddle_left.paddle_x = this.canvas.width * 0.01 ;
        // this.paddle_left.paddle_y = this.canvas.height / 2;
        this.p_width = (this.canvas.width * 0.01) | 0;
        this.p_height = (this.canvas.height * 0.2) | 0;
        this.p_start = this.canvas.width - (this.p_width) - this.p_width;
        this.p_speed = (this.canvas.height * 0.02) | 0;
        this.paddle_left.paddle_width = this.p_width;
        this.paddle_left.paddle_height = this.p_height;
        this.paddle_left.draw_padle();
        this.paddle_right.paddle_width = this.p_width;
        this.paddle_right.paddle_height = this.p_height;
        this.paddle_right.draw_padle();
        this.b_radius = (this.canvas.width * 0.01) | 0;
        this._ball.ball_radius = this.b_radius;

        this._ball.draw_ball();
        this.center_rec.paddle_x = this.canvas.width / 2;
        this.center_rec.paddle_height = this.canvas.height;
        this.center_rec.draw_padle();
        if (this.data.map == "Map3") {
            this.bar.draw_padle();
        }
    }

    show_score() {
        this.ctx.font = "25px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.paddle_right._score, this.canvas.width / 2 - this.canvas.width * 0.05, 30);
        this.ctx.fillText(this.paddle_left.score, this.canvas.width / 2 + this.canvas.width * 0.05, 30);
    }

    draw_winner(name: string) {
        this.ctx.font = (this.canvas.width * 0.05) + "px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("The WINNER is " + name, this.canvas.width / 2 - this.ctx.measureText("The WINNER is " + name).width / 2, this.canvas.height / 2);
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2 + (this.canvas.height * 0.3), (this.canvas.width* 0.09), 0, Math.PI * 2);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.fillStyle = "red";
        this.ctx.fillText("Home", this.canvas.width / 2 - this.ctx.measureText("Home").width / 2, this.canvas.height / 2 + this.canvas.height * 0.35);
        this.pause = true;
    }


    homeClick(e: MouseEvent) {

        const circle = new Path2D();
        circle.arc(this.canvas.width / 2, this.canvas.height / 2 + this.canvas.height * 0.3, (this.canvas.width * 0.1), 0, Math.PI * 2);
        this.ctx.fillStyle = "white";

        this.ctx.fill(circle);
        if (this.ctx.isPointInPath(circle, e.offsetX, e.offsetY)) {
            if (this.paddle_left._score === 10 || this.paddle_right._score === 10 || this.time <= 1) {
                this.socket.emit('GameOverServer', {
                    idgame: this.data.idgame,
                    idUser: this.MyData['id']
                });
            }

        }
        // }
    }


    req: any;
    miniball() {
        this.ctx.beginPath();
        // random color
        let r: number = Math.floor(Math.random() * 255);
        let g: number = Math.floor(Math.random() * 255);
        let b: number = Math.floor(Math.random() * 255);
        this.ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        // random x and y 
        let x: number = Math.floor(Math.random() * this.canvas.width);
        let y: number = Math.floor(Math.random() * this.canvas.height - 50);
        // let r:numberadius = ;
        this.ctx.arc(x, y, 1, 0, Math.PI * 2, true);
        this.ctx.fill();
        this.ctx.closePath();
    }

    animate() {
        let i: number = 0;
        this.canvas.style.backgroundColor = "rgb(44, 44, 84)";
        while (i < 10) {
            this.miniball();
            i++;
        }
    }

    Map4() {
        this.canvas.style.backgroundColor = "#00BCCA";
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 30, 0, Math.PI * 2);
        this.ctx.strokeStyle = "white";
        this.ctx.stroke();
        this.ctx.closePath();
    }



    start() {

        this.canvas.width = (window.innerWidth * 0.5) | 0;
        this.canvas.height = (window.innerHeight * 0.5) | 0;
        if (window.innerWidth < 500 && window.innerHeight > window.innerWidth) {

            this.canvas.width = (window.innerHeight * 0.5) | 0;
            this.canvas.height = (window.innerWidth * 0.5) | 0;

        }
        this.draw();
        if (this.data.map == "Map2") {
            this.animate();
        }
        if (this.data.map == "Map3") {
            this._ball.bot(this.bar);
        }
        if (this.data.map == "Map4") {
            this.Map4();
        }

        if (!this.pause) {
            this.show_score();
            this.keyhook();
            if (this.email1 === this.MyData['email']) {
                this.collisionDetection();

                this.time = 10;
                this._ball.ball_x += this._ball._velocity_x;
                this._ball.ball_y += this._ball._velocity_y;
            }
            if (this.email1 === this.MyData['email']) {
                this.socket.emit('BallServer',
                    {
                        ball_x: this._ball.ball_x,
                        ball_y: this._ball.ball_y,
                        velocity_x: this._ball._velocity_x,
                        velocity_y: this._ball._velocity_y,
                        score1: this.paddle_left.score,
                        score2: this.paddle_right.score,
                        gameid: this.gameid,
                        width: this.canvas.width,
                        height: this.canvas.height,
                        idUser: this.MyData['email'],
                    });
            }
        }
        else {
            this.ctx.font = "40px Arial";
            this.ctx.fillStyle = "red";
            this.ctx.fillText(this.time, 50, 50);
        }
        if (this.paddle_left.score === 10 || this.paddle_right.score === 10) {
            let newId: number = 0;
            if (this.paddle_left.score === 10) {
                newId = this.data['user2']['id'];
                axios.post('http://localhost:3001/game/finish/' + this.gameid + '/' + this.data['user2']['id'],
                    {
                        map: "none",
                        user1_score: this.paddle_right._score + ' ',
                        user2_score: this.paddle_left._score + ' ',
                    })
                    .then(res => {
                        this.draw_winner(this.data['user2']['username']);
                    });
            }
            else {
                newId = this.data['user2']['id'];
                axios.post('http://localhost:3001/game/finish/' + this.gameid + '/' + this.data['user1']['id'],
                    {
                        map: "none",
                        user1_score: this.paddle_right._score + ' ',
                        user2_score: this.paddle_left._score + ' ',
                    })
                    .then(res => {
                        this.draw_winner(this.data['user1']['username']);
                    });
            }
            // this.socket.emit('PauseServer',
            //     {
            //         gameid: this.gameid,
            //         this.paused_id = msg.id;

            //     });
            // clear requestAnimationFrame
            cancelAnimationFrame(this.req);

            this.pause = true;
            return;
        }
        if (this.email1 === this.MyData['email'] || this.email2 === this.MyData['email']) {
            if (!document.hasFocus() && !this.pause) {
                // this.socket.emit('PauseServer',
                //     {
                //         gameid: this.gameid,
                //         pause: this.pause,
                //         id: this.MyData['id'],
                //     });
            }
        }
        this.draw_footer();
        this.req = requestAnimationFrame(() => this.start());
    }
}



// class GPEXPORT {
//     ball: ball;
//     paddle_left: player;
//     paddle_right: player;
//     time: number;
//     json: string;

//     constructor(ball: ball, paddle_left: player, paddle_right: player, time: number) {
//         this.ball = ball;
//         this.paddle_left = paddle_left;
//         this.paddle_right = paddle_right;
//         this.time = time;
//         this.json = "[";
//     }

//     CreateJson(time: number) {
//         this.json += "{";
//         this.json += '"Time":' + time + ',';
//         this.json += '"Player1":';
//         this.json += this.paddle_left.Tojson();
//         this.json += ',';
//         this.json += '"Player2":';
//         this.json += this.paddle_right.Tojson();
//         this.json += ',';
//         this.json += '"Ball":';
//         this.json += this.ball.Json();
//         this.json += '},\n';
//     }

//     finish() {
//         this.json = this.json.substring(0, this.json.length - 2);
//         this.json += "]";
//         return this.json;
//     }
// }

var t = false;

const Canvas = (props: any) => {
    const [data, setData] = useState(props.data ? props.data : []);
    const canvasRef = useRef(null);
    let context: any = useMyContext();
    const [MyData, setMyData] = useState(props.mydata ? props.mydata : []);
    // console.log(props.data);
    const [isWating, setIsWating] = useState(true);
    var socket = io('http://localhost:3080');
    //  console.log(context.GameInfo);

    // console.log(window);
    // console.log("Context", context.ShowCanvas.gameInfo);
    // console.log("MyData", MyData);
    // console.log("data", data);   
    useEffect(() => {
        socket.on('ConnectClient', (res: any) => {
            {
                if (isWating === true) {
                    // if ((context.ShowCanvas.gameInfo['user1']['id'] === res.idUser || context.ShowCanvas.gameInfo['user2']['id'] === res.idUser)) 
                    {
                        if (res.data['is_started'] === true && res.data['id'] === context.ShowCanvas.gameInfo['id'] && res.data['user2'] != undefined)
                         {
                            setIsWating(false);
                            setData(res.data);
                            context.ShowCanvas.gameInfo = res.data;
                            console.log("data", res.data);
                            new Game(canvasRef.current as unknown as HTMLCanvasElement, res.data, socket, props.mydata);
                        }
                        if (res.data['is_rejected_by_user2'] === true && res.data['id'] === context.ShowCanvas.gameInfo['id']) {
                            setIsWating(false);
                            context.setShowCanvas({
                                show: false,
                                gameInfo: {},
                            });
                        }
                    }
                }
                // if ((context.ShowCanvas.gameInfo['user1']['id'] !== res.idUser && context.ShowCanvas.gameInfo['user2']['id'] !== res.idUser)) 
                // {
                //     setIsWating(false);
                //     setData(res.data);
                //     context.ShowCanvas.gameInfo = res.data;
                //     new Game(canvasRef.current as unknown as HTMLCanvasElement, res.data, socket, props.mydata);
                // }
            }
        });
        socket.on('GameOverClient', (res: any) => {
            if (res['idUser'] === MyData['id']) {
                setIsWating(false);
                context.setShowCanvas({
                    show: false,
                    gameInfo: {},

                });
            }
        });

        if ((context.ShowCanvas.gameInfo['user1']['email'] === MyData['email'] || context.ShowCanvas.gameInfo['user2']['email'] === MyData['email']) || context.ShowCanvas.gameInfo['user2']['id'] === 0) {
            socket.emit('ConnectServer', {
                GameInfo: context.ShowCanvas.gameInfo,
                idUser: MyData['id'],
            });
        }
        else {
            // setIsWating(false);
            // // while ( === null)
            // console.log("Wa9ila here")
            //     new Game(canvasRef.current as unknown as HTMLCanvasElement, context.ShowCanvas.gameInfo, socket, props.mydata);
        }

    }, [isWating]);

    return (

        <div suppressHydrationWarning={true}>
            {isWating && <Dialog />}
            < canvas id='canvas' ref={canvasRef}  {...props} width={(window.innerWidth * 0.5) | 0} height={(window.innerHeight * 0.5) | 0} />
        </div>

    );
};

export default Canvas;