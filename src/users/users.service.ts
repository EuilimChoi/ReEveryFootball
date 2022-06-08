import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '../entity/users.entity';
import {Playerinmatch} from '../entity/playersInMatch.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { JwtService } from '@nestjs/jwt';
import { signinDto, userloginDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    
    @InjectRepository(Playerinmatch)
    private playerInMatchRepository: Repository<Playerinmatch>,

    private jwtService: JwtService
  ){}

  getHello(): string {
    return 'Hello ReEveryfootball!';
  }
    
  async signin(users) : Promise <Object> {
      const check_id = await this.usersRepository.findOne({user_id : users.user_id})
      const check_email = await this.usersRepository.findOne({email : users.email})

      if(check_id){
        throw new HttpException('아이디가 이미 사용 중입니다.', HttpStatus.BAD_REQUEST)
      }else if(check_email){
        throw new HttpException('이메일이 이미 사용 중입니다.', HttpStatus.BAD_REQUEST)
      }else{
        await this.usersRepository.save(users)
        return {message : '가입이 완료 되었습니다.'}
      }
  } 

  async login(users) : Promise<{accessToken: string} | undefined>{
    const check_id = await this.usersRepository.findOne({user_id : users.user_id})
    const check_password = await this.usersRepository.findOne({user_id : users.user_id, password : users.password})
    if(check_id){
      if(check_password){
        const payload = {user_id : check_id.user_id, email : check_id.email}
        return {accessToken: this.jwtService.sign(payload)}
        
      }else{
        throw new UnauthorizedException('비밀번호를 확인해 주세요.')
      }
    }else{
      throw new UnauthorizedException('가입되지 않은 유저 입니다.');
    }
  }

  async patch_userinfo(Users : signinDto) : Promise <any>{
    try{
      const update = await this.usersRepository.findOne({user_id : Users.user_id})
      update.email = Users.email;
      update.nickname = Users.nickname;
      update.password = Users.password;
  
      const updated = await this.usersRepository.save(update)
      if(update){
      return {message : '유저 정보가 변경되었습니다.'}
      }else{
          throw new HttpException('유저 정보가 변경되지 않았습니다.', HttpStatus.BAD_REQUEST)
      }}
      catch(err){
          throw new HttpException('오류가 발생했습니다.', HttpStatus.BAD_REQUEST)
      }
  }

  async delete_user(header) : Promise <any> {
    try{        
    const token = header.rawHeaders[1].split(" ")[1]
    const verify = this.jwtService.verify(token, {secret: "1234"})
    const targetuser = await this.usersRepository.findOne({user_id : verify.user_id})
      if (!targetuser){
          throw new HttpException('가입되지 않은 유저입니다.', HttpStatus.BAD_REQUEST)
      }else{
          await this.usersRepository.remove(targetuser)
          return "회원 탈퇴가 진행되었습니다."
      }
    }catch(err){
        console.log(err)
        throw new HttpException('유효하지 않은 토큰입니다.', HttpStatus.BAD_REQUEST)
    }
  }


  async logout(header) : Promise<any> {
    const token = header.rawHeaders[1].split(" ")[1]
    const verify = this.jwtService.verify(token, {secret: "1234"})
    if(verify){
      return {meesage : '로그아웃 되었습니다.'}
    }
  }

  async getuserinfo(header) : Promise<any> {
    const token = header.rawHeaders[1].split(" ")[1]
    const verify = this.jwtService.verify(token, {secret: "1234"})
    const targetuser = await this.usersRepository.findOne({user_id : verify.user_id})
    const targetmatch = await this.playerInMatchRepository.find({user : verify.user_id})
    if(!targetuser){
      throw new HttpException('유효하지 않은 정보입니다. 다시 로그인해주세요', HttpStatus.BAD_REQUEST)
    }else{
      return {targetuser,targetmatch}
    }
  }


}
