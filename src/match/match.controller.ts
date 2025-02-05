import { Get,Post,Param,Req, Body  } from '@nestjs/common';
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
  joinmatch(@Req() header : Request, @Param('matchId') matchId:number) : any {
    return this.matchservice.joinmatch(header,matchId);
  }

  @Get('/getmatchinfo/:matchId')
  getMatchinfo(@Param('matchId') matchId:number) : any {
    return this.matchservice.getMatchinfo(matchId);
  }

  @Get('/getmatchlist')
  getMatchList() : any {
    return this.matchservice.getMatchList()
  }

  @Post('/makematch')
  makeMatch(@Body() matchInfo) : Promise <Object> {
    return this.matchservice.makeMatch(matchInfo)
  }

  @Post('/matchresult')
  matchResult(@Body() matchResult) : Promise <Object> {
    return this.matchservice.matchResult(matchResult.result)
  }

}
