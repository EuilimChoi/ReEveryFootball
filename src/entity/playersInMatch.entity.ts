import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany, ManyToOne} from "typeorm"
import {Users} from "./users.entity"
import {Matches} from "./matches.entity"


@Entity()
export class Playerinmatch {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    user_id : string;

    @Column()
    match_id : string;

    @Column({default: 0})
    goal : number;

    @Column({default: 0})
    shooting : number;

    @Column({default: 0})
    assist : number;

    @Column({default: false})
    win : string;
    
    @Column({default: false})
    match_end : string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @ManyToOne(()=>Users, (users) => users.user_id , { nullable: false, onDelete: 'CASCADE' })
    users : Users

    @ManyToOne(()=>Matches, (matches) => matches.match_id , { nullable: false, onDelete: 'CASCADE' })
    matches : Matches
}
