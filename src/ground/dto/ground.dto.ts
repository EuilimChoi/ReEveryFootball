import { IsString, IsNumber, IsDate, IsBoolean} from "class-validator";

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