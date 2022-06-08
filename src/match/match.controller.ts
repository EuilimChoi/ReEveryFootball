import { Get,Post,Param,Req  } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { MatchService} from "./match.service"
import { Response, Request } from 'express';

@Controller('match')
export class MatchController {
  constructor(private readonly  matchservice : MatchService) {}

  @Get('/')
  getHello() : string{
    return this.matchservice.getHello();
  }

  @Get('/joinmatch/:matchId')
  joinmatch(@Req() header : Request, @Param('matchId') matchId: Number) : any {
    return this.matchservice.joinmatch(header,matchId);
  }

  @Get('/getmatchinfo/:matchId')
  getMatchinfo(@Param('matchId') matchId: Number) : any {
    return this.matchservice.getMatchinfo(matchId);
  }
}
