import { Athlete } from "../../athletes/entities/athlete.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Speciality, Status } from "../enums/shift.enum";

@Entity('Shifts')
export class Shift {

    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => Athlete, (athlete) => athlete.shifts)
    athlete: Athlete

    @Column({type: 'enum', enum: Status, default: Status.Unattended})
    status: Status;

    @Column({type: 'enum', enum: Speciality, nullable: false})
    speciality: Speciality;

    @Column({type: 'text', nullable: true})
    remarks?: string

    @CreateDateColumn()
    createdAt: Date
}
