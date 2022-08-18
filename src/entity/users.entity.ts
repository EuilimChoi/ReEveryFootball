import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from "typeorm"
import {Playerinmatch} from "./playersInMatch.entity"


@Entity()
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable : false})
    user_id : String;

    @Column({nullable : false})
    password : String;

    @Column({nullable : false})
    full_name : String;

    @Column({nullable : false})
    email : String;

    @Column({nullable : true})
    nickname : String;

    @Column({default: 0})
    total_goal : number;

    @Column({default: 0})
    total_shoot : number;

    @Column({default: 0})
    total_assist : number;
    
    @Column({default: 0})
    total_win : number;
    
    @Column({default: 0})
    perfer_time : number;

    @Column({default: 0})
    perfer_location : number;
    
    @Column({default: 0})
    penalty : number;
    
    @Column({default: false})
    admin : Boolean;
    
    @Column({default: 0})
    total_game : number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @OneToMany(() => Playerinmatch, playerinmatch => playerinmatch.id)
    playerinmatch : Playerinmatch[];

}

