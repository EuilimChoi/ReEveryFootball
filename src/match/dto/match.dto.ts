import { IsString, IsNumber, IsDate, IsBoolean} from "class-validator";

export class MatchMakingDto{
    @IsDate()
    time : string;

    @IsNumber()
    player : number;

    @IsString()
    matchgender : string;

    @IsString()
    score : string;

    @IsNumber()
    groundId: number;
}

export class GroundInfoDto{
    @IsString()
    ground_name : string;

    @IsString()
    ground_location : string;

    @IsBoolean()
    parking_support : boolean;

    @IsBoolean()
    toilet_support : boolean;

    @IsBoolean()
    shower_support : boolean;

    @IsString()
    img : string;
}

export class ResultDto{
    @IsNumber()
    id : Number;

    @IsNumber()
    goal : Number;

    @IsNumber()
    shoot : Number;

    @IsNumber()
    assist : Number;

    @IsNumber()
    penalty : Number;

    @IsNumber()
    win : boolean;
}