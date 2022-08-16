import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { Grounds } from 'src/entity/grounds.entity';
import { GroundInfoDto } from './dto/ground.dto';
import {Repository} from 'typeorm'

@Injectable()
export class GroundService {
	constructor(
		@InjectRepository(Grounds)
		private groundRepository: Repository<Grounds>,
	){}

	async getGroundInfoById(groundid : number) : Promise<Object>{
		const findGroundInfo = await this.groundRepository.findOne({id : groundid})
		if(findGroundInfo){
			return {status : HttpStatus.ACCEPTED, groundInfo : findGroundInfo}
		}else{
			return {status : HttpStatus.NOT_FOUND, message : "해당 구장이 없습니다."}
		}
	}

	async getAllGround():Promise<Object>{
		const findGroundInfo = await this.groundRepository.find()
		return {status : HttpStatus.ACCEPTED, groundInfo : findGroundInfo}
	}

	async createGroundInfo(groundInfo:GroundInfoDto) : Promise<Object>{
		const checkGround = await this.groundRepository.findOne({ground_name : groundInfo.ground_name, ground_location : groundInfo.ground_location})
    if (checkGround){
      throw new HttpException('이미 등록된 구장 입니다.', HttpStatus.BAD_REQUEST)
    }

    try{
      await this.groundRepository.save(groundInfo)
			return {message:"구장이 등록되었습니다." , groundInfo : {groundInfo}}
    }catch(e){
      console.log(e)
      return new HttpException('ERR! 다시 시도해주세요.',HttpStatus.BAD_REQUEST)
    }
	}

	async patchGroundInfo(groundid : number, groundInfo:GroundInfoDto): Promise<Object>{
		try{
			await this.groundRepository.update(groundid,groundInfo)
			return {message: "구장 정보가 변경되었습니다.", groundInfo:groundInfo}
		}catch(e){
			return new HttpException('수정되지 않았습니다. 다시 시도해 주세요',HttpStatus.BAD_REQUEST)
		}
		
	}

	async deleteGroundInfo(groundid:number){
		const checkGround = await this.groundRepository.findOne({id : groundid})
		if(!checkGround){
			return {message:"구장이 존재하지 않습니다.", status : HttpStatus.BAD_REQUEST}
		}
		try{
			await this.groundRepository.delete({id:groundid})
			return {message : "구장 정보가 삭제되었습니다.", groundinfo:{groundid:groundid}, status : HttpStatus.ACCEPTED}
		}catch(e){
			return new HttpException("구장 정보가 삭제되지 않았습니다.",HttpStatus.BAD_GATEWAY)
		}
	}
}
