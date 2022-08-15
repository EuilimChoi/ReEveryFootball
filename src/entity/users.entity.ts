import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from "typeorm"
import {Playerinmatch} from "./playersInMatch.entity"


@Entity()
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: Number;

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
    total_goal : Number;

    @Column({default: 0})
    total_shoot : Number;

    @Column({default: 0})
    total_assist : Number;
    
    @Column({default: 0})
    total_win : Number;
    
    @Column({default: 0})
    perfer_time : Number;

    @Column({default: 0})
    perfer_location : Number;
    
    @Column({default: 0})
    penalty : Number;
    
    @Column({default: false})
    admin : Boolean;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @OneToMany(() => Playerinmatch, playerinmatch => playerinmatch.id)
    playerinmatch : Playerinmatch[];

}

