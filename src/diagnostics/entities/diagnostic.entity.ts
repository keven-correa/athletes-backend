import { Appointment } from "../../appointment/entities/appointment.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Diagnostics')
export class Diagnostic {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({unique: true, type: 'varchar', length: 55})
    name: string;

    @OneToMany(() => Appointment, (appointment) => appointment.diagnostic_classification)
    appointments?: Appointment[]

    @CreateDateColumn()
    created_at: Date;
}
