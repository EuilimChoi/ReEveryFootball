import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany, ManyToOne} from "typeorm"
import {Users} from "./users.entity"
import {Matches} from "./matches.entity"


@Entity()
export class Playerinmatch {
    @PrimaryGeneratedColumn('increment')
    id: Number;

    @Column({default: 0})
    goal : Number;

    @Column({default: 0})
    shooting : Number;

    @Column({default: 0})
    assist : Number;

    @Column({default: false})
    win : string;
    
    @Column({default: false})
    match_end : string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @Column({ nullable: true })
    userId: number;

    @Column({ nullable: true })
    matchId: number;

    @ManyToOne(()=>Users, user => user.user_id , { nullable: false, onDelete: 'CASCADE', })
    userid : Users

    @ManyToOne(()=>Matches, (matches) => matches.id , { nullable: false, onDelete: 'CASCADE' })
    match : Matches
}
