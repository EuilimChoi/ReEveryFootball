import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from "typeorm"
import {Playerinmatch} from "./playersInMatch.entity"


@Entity()
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({default: 0})
    user_id : string;

    @Column({nullable : false})
    password : string;

    @Column({default: 0})
    full_name : string;

    @Column({default: 0})
    email : string;

    @Column({default: 0})
    nickname : string;

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
    admin : boolean;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @OneToMany(() => Playerinmatch, (playerinmatch) => playerinmatch.user_id)
    playerinmatch : Playerinmatch[]

}

