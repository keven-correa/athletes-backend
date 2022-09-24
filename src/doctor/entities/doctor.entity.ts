import { Appointment } from "../../appointment/entities/appointment.entity";
import { Therapy } from "../../therapy/entities/therapy.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evaluation } from "../../evaluation/entities/evaluation.entity";

@Entity('Doctors')
export class Doctor {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    lastName: string;

    @Column('text', {
        unique: true
    })
    email: string

    @Column('text')
    phone: string;

    @OneToMany(
        () => Appointment,
        (doctorAppointment) => doctorAppointment.doctor
    )
    appointments: Appointment[]

    @OneToMany(
        () => Therapy,
        (doctorTherapy) => doctorTherapy.doctor
    )
    therapies?: Therapy[];

    @OneToMany(
        () => Evaluation,
        (doctorEvaluation) => doctorEvaluation.doctor
    )
    evaluations?: Evaluation[];
}
