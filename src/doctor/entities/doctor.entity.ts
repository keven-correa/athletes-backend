import { Appointment } from '../../appointment/entities/appointment.entity';
import { Therapy } from '../../therapy/entities/therapy.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Evaluation } from '../../evaluation/entities/evaluation.entity';
import { doctorsTypes } from '../enums/enums';
import { User } from '../../auth/entities/user.entity';

@Entity('Doctors')
export class Doctor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  lastName: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  phone: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
  @Column({ type: 'enum', enum: doctorsTypes })
  doctorType: doctorsTypes;

  @OneToMany(() => Appointment, (doctorAppointment) => doctorAppointment.doctor)
  appointments: Appointment[];

  @OneToMany(() => Therapy, (doctorTherapy) => doctorTherapy.doctor)
  therapies?: Therapy[];

  @OneToMany(() => Evaluation, (doctorEvaluation) => doctorEvaluation.doctor)
  evaluations?: Evaluation[];

  @JoinColumn({ name: 'created_by' })
  @ManyToOne(() => User, (user) => user.created_by, { eager: true })
  created_by: User;

  @JoinColumn({ name: 'updated_by' })
  @ManyToOne(() => User, (user) => user.doctor_updated_by, { eager: true })
  updated_by: User;
}
