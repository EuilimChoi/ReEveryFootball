import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {Users} from './entity/users.entity'
import {Playerinmatch} from './entity/playersInMatch.entity'
import {Matches} from './entity/matches.entity'
import {Grounds} from './entity/grounds.entity'

function ormConfig(): TypeOrmModuleOptions {
	const commonConf = {
        SYNCRONIZE: true,
        ENTITIES: [Users,Playerinmatch,Matches,Grounds],
        // ENTITIES: [__dirname +'/entity/*.entity.ts'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRATIONS_RUN: false,
    };

    console.log(commonConf.ENTITIES)
    const ormconfig: TypeOrmModuleOptions = {
        name: 'Reeveryfootball',
        type: 'mysql',
        database: 'Reeveryfootball',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        logging: true,
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        migrationsRun: commonConf.MIGRATIONS_RUN,
        
    };
    
    return ormconfig;
}

export { ormConfig };