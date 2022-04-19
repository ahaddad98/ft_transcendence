import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { Game } from "src/core/entities/game.entity";
import { User } from "src/core/entities/user.entity";


const config:TypeOrmModuleOptions = 
{
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'sqatim',
    password: '13266231',
    database: 'transcendence',
    synchronize: true,
    entities:  [join(__dirname, '/../**/**.entity{.ts,.js}')]
};

export default config;