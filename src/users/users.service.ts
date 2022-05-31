import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '../entity/users.entity';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService
  ){}

    getHello(): string {
      return 'Hello ReEveryfootball!';
    }
    
    async signin(users) : Promise <String> {
        const check_id = await this.usersRepository.findOne({user_id : users.user_id})
        const check_email = await this.usersRepository.findOne({email : users.email})

        if(check_id){
          throw new HttpException('아이디가 이미 사용 중입니다.', HttpStatus.BAD_REQUEST)
        }else if(check_email){
          throw new HttpException('이메일이 이미 사용 중입니다.', HttpStatus.BAD_REQUEST)
        }else{
          await this.usersRepository.save(users)
          return '가입이 완료 되었습니다.'
        }
    }
}
