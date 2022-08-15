import { HttpException, HttpStatus, Injectable, Param, UnauthorizedException,Req } from '@nestjs/common';

import { Users } from 'src/entity/users.entity';
import {Playerinmatch} from 'src/entity/playersInMatch.entity'
import { Grounds } from 'src/entity/grounds.entity';
import { Matches } from 'src/entity/matches.entity';

import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { JwtService } from '@nestjs/jwt';
import { get } from 'http';




@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
      
    @InjectRepository(Playerinmatch)
    private playerInMatchRepository: Repository<Playerinmatch>,

    @InjectRepository(Grounds)
    private groundRepository: Repository<Grounds>,

    @InjectRepository(Matches)
    private matchesRepository: Repository<Matches>,

    private jwtService: JwtService
  ){}

  getHello(): string {
    return 'this is match';
  }

  async joinmatch(header, matchId) : Promise<any> {

    const token = header.rawHeaders[1].split(" ")[1]
    const verify = await this.jwtService.verify(token, {secret: "1234"})
    const getuser = await this.usersRepository.findOne({user_id : verify.user_id})

    console.log(getuser)

    await this.playerInMatchRepository.save({
      match : matchId,
      userid : verify.id
    })

    return {message : `${matchId}에 참가하셨습니다.`}
  }

  async getMatchinfo(matchId): Promise <any> {

    const findmatch = await this.matchesRepository.findOne({id : matchId})
    console.log(findmatch)
    const getGroundinfo = await this.groundRepository.findOne({id : findmatch.groundId})
    const getJoinedPlayer = await this.playerInMatchRepository.find({matchId : matchId})

    return {
      matchinfo : findmatch,
      Groundinfo : getGroundinfo,
      JoinedPlayer : getJoinedPlayer
    }
  }

  async getMatchList() : Promise <any>{
    const findmatch = await this.matchesRepository.find()
    return findmatch
  }
}

