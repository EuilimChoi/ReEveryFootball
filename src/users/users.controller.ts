import { Controller, Get, Post, Body } from '@nestjs/common';
import {UsersService} from './users.service'

@Controller('users')
export class UsersController {
    //로그인(post), 로그아웃(get), 회원가입(post), 회원탈퇴(get), 회원정보 변경(post)
    constructor(private readonly usersService : UsersService) {}

    @Get('/')
    getHello() : string{
        return this.usersService.getHello();
    }

    @Post('/signin')
    async signin(@Body() user : any) : Promise <String> {
        return this.usersService.signin(user);
    }

}
