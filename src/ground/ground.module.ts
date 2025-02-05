import { Module } from '@nestjs/common';
import { GroundController } from './ground.controller';
import { GroundService } from './ground.service';

import { Users } from '../entity/users.entity'
import { Playerinmatch } from '../entity/playersInMatch.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Grounds } from 'src/entity/grounds.entity';
import { Matches } from 'src/entity/matches.entity';

@Module({
    imports : [
        TypeOrmModule.forFeature([Users, Playerinmatch, Grounds,Matches]),
        JwtModule.register({
            secret : '1234',
            signOptions : {expiresIn : '12h'},
        })
    ],
    exports : [TypeOrmModule],
      controllers: [GroundController],
      providers: [GroundService]
})
export class GroundModule {}
