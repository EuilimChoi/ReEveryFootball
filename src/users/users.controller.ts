import { Controller, Get, Post, Body,Patch,Delete,Req,Res } from '@nestjs/common';
import { Users } from 'src/entity/users.entity';
import {signinDto,userloginDto} from './dto/user.dto'
import {UsersService} from './users.service'
import { Response, Request } from 'express';


@Controller('users')
export class UsersController {
    //로그인(post), 로그아웃(get), 회원가입(post), 회원탈퇴(get), 회원정보 변경(post)
    constructor(private readonly usersService : UsersService) {}

    @Get('/')
    getHello() : string{
        return this.usersService.getHello();
    }

    @Post('/signin')
    async signin(@Body() user : any) : Promise <Object> {
        return this.usersService.signin(user);
    }

    @Post('/login')
    async login(@Body() users : userloginDto, @Res() res: Response) : Promise <any> {
        const jwt = await this.usersService.login(users);
        res.setHeader('Authorization', 'Bearer '+jwt.accessToken);
        return res.json({
            message: "Login success!",
            data: {
                accessToken : jwt.accessToken
            },
        })
    }

    @Patch('/changeuserinfo')
    patch_userinfo(@Body() users : signinDto) : Promise <any>{
        return this.usersService.patch_userinfo(users)
    }    

    @Delete('/signout')
    delete_user(@Req() header : Request ): Promise<string> {
        return this.usersService.delete_user(header);
    }

    @Get('/logout')
    logout(@Req() header : Request): Promise<Object>{
        return this.usersService.logout(header);
    }

    @Get('/userinfo')
    userinfo(@Req() header : Request): Promise<Object>{
        return this.usersService.getuserinfo(header);
    }
}