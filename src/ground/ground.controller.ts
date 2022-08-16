import { Controller, Get, Post, Param, Body,Patch,Delete,Req,Res, } from '@nestjs/common';
import { GroundInfoDto } from './dto/ground.dto';
import internal from 'stream';
import {GroundService} from './ground.service'

@Controller('ground')
export class GroundController {

    constructor(private readonly groundService : GroundService) {}

    @Get(':groundid')
    getGroundInfo(@Param('groundid') groundid : number) {
        return this.groundService.getGroundInfoById(groundid);
    }

		@Get('/')
    getAllGround() {
        return this.groundService.getAllGround();
    }

    @Post('/')
		createGroundInfo(@Body() groundInfo:GroundInfoDto){
        return this.groundService.createGroundInfo(groundInfo);
    }

    @Patch(':groundid')
		patchGroundInfo(@Body()groundInfo:GroundInfoDto,@Param ('groundid') groundid:number ){
        return this.groundService.patchGroundInfo(groundid,groundInfo);
    }

    @Delete(':groundid')
		deleteGroundInfo(@Param('groundid') groundid:number){
        return this.groundService.deleteGroundInfo(groundid);
    }
}
