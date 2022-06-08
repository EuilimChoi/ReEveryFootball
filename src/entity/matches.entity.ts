import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany, ManyToOne} from "typeorm"
import { Grounds } from "./grounds.entity";
import {Playerinmatch} from "./playersInMatch.entity"

@Entity()
export class Matches {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    time : string;

    @Column()
    player : string;

    @Column({default: 0})
    matchgender : number;

    @Column({default: 0})
    score : number;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @ManyToOne(() =>Grounds, grounds => grounds.id)
    ground : Grounds

    @OneToMany(() => Playerinmatch, playerinmatch => playerinmatch.match)
    playerinmatch : Playerinmatch[]

}
