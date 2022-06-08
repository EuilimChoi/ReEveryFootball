import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from "typeorm"
import {Matches} from "./matches.entity"


@Entity()
export class Grounds {
    @PrimaryGeneratedColumn('increment')
    @OneToMany(() => Matches, (matches) => matches.ground)
    id: number;

    @Column()
    ground_name : string;

    @Column()
    ground_location : string;

    @Column({default: false})
    parking_support : boolean;

    @Column({default: false})
    toilet_support : boolean;

    @Column({default: false})
    shower_support : boolean;

    @Column({default: ""})
    img : string;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    


}