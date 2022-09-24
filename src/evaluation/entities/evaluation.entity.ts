import { Doctor } from "../../doctor/entities/doctor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Athlete } from "../../athletes/entities/athlete.entity";

@Entity('Evaluations')
export class Evaluation {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    therapeuticDiagnosis: string;

    @Column('varchar')
    treatment: string;

    @Column('int')
    ROM: number;

    @Column('int')
    painLevel: number;

    @Column('int')
    quantity: number;

    @Column('varchar')
    remarks: string;

    @ManyToOne(
        () => Doctor,
        (doctorEvaluation) => doctorEvaluation.evaluations
    )
    doctor: Doctor

    @ManyToOne(
        () => Athlete,
        (athleteEvaluation) => athleteEvaluation.evaluations
    )
    athlete: Athlete
}
