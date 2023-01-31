import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { doctorType, urgencyLevel } from "../enums/enums";

@Entity()
export class Shift {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'enum', enum: urgencyLevel, default: urgencyLevel.normal})
    urgencyLevel: urgencyLevel

    @Column({type: 'enum', enum: doctorType, default: doctorType.physician})
    doctorType: doctorType

    @CreateDateColumn()
    created: Date
}
