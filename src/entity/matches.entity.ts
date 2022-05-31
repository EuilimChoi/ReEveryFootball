import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from "typeorm"
import {Playerinmatch} from "./playersInMatch.entity"

@Entity()
export class Matches {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    match_id : string;

    @Column()
    time : string;

    @Column()
    player : string;

    @Column()
    location : string;

    @Column({default: 0})
    matchgender : number;

    @Column({default: 0})
    score : number;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @OneToMany(() => Playerinmatch, (playerinmatch) => playerinmatch.match_id)
    playerinmatch : Playerinmatch[]

}
