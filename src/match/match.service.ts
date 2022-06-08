import { HttpException, HttpStatus, Injectable, Param, UnauthorizedException,Req } from '@nestjs/common';

import { Users } from 'src/entity/users.entity';
import {Playerinmatch} from 'src/entity/playersInMatch.entity'
import { Grounds } from 'src/entity/grounds.entity';
import { Matches } from 'src/entity/matches.entity';

import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { JwtService } from '@nestjs/jwt';




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

  async joinmatch(header,matchId : Number) : Promise<any> {

    const token = header.rawHeaders[1].split(" ")[1]
    const verify = await this.jwtService.verify(token, {secret: "1234"})
    const getuser = await this.usersRepository.findOne({user_id : verify.user_id})



    const userinfo = {
      userId : "sdfsdfgggg", 
      matchId : 3,
      goal : 99,
      assist : 99,
      shooting : 99,
    }

      console.log(userinfo)
      await this.playerInMatchRepository.save(userinfo)

      return {message : `${matchId}에 참가하셨습니다.`}




    // async function checkUserAlreadyJoinThisMatchAndJoin(){
    //   const checkRoom = await this.playerInMatchRepository.find({user_id : verify.user_id, matchesId : matchId})
    //   checkRoom ? {message : "이미 참가하셨습니다"} : joinThisMatch()
    // }
    
    // checkUserAlreadyJoinThisMatchAndJoin()
  }

  async getMatchinfo(matchId): Promise <any> {

      const findmatch = await this.matchesRepository.findOne({id : matchId})
      //const getGroundinfo = await this.groundRepository.findOne({id : findmatch.ground})
      console.log(findmatch)
      const getJoinedPlayer = await this.playerInMatchRepository.find({match : matchId})

      // return {matchinfo : {
      //   Groundinfo : getGroundinfo,
      //   JoinedPlayer : getJoinedPlayer
      // }}

  }
}
