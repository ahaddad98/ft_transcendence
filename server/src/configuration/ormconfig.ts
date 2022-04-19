import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { Game } from "src/core/entities/game.entity";
import { User } from "src/core/entities/user.entity";


const config:TypeOrmModuleOptions = 
{
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'test_db',
    synchronize: true,
    entities:  [join(__dirname, '/../**/**.entity{.ts,.js}')]
};

export default config;