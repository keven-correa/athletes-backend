import { Appointment } from '../../appointment/entities/appointment.entity';
import {Modality} from '../../modality/entities/modality.entity'
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BloodType, LevelOfSchooling, MaritalStatus, PatientType } from '../enums/enum';
import { Therapy } from '../../therapy/entities/therapy.entity';

@Entity('Athletes')
export class Athlete {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', {unique: true})
  document: string;

  @Column('int')
  age: number;

  @Column()
  dateOfBirth: Date;

  @Column('int')
  maritalStatus: MaritalStatus;

  @Column('int')
  patientType: PatientType;

  @Column('int')
  levelOfSchooling: LevelOfSchooling;

  @Column('text')
  address: string;

  @Column('varchar')
  cell: string;

  @Column('varchar')
  phone: string;

  @Column('int')
  bloodType: BloodType;

  @Column('float')
  weight: number;

  @Column('float')
  height: number

  @OneToMany(
    () => Appointment,
    (athleteAppointment) => athleteAppointment.athlete
  )
  appointments?: Appointment[]

  @OneToMany(
    () => Therapy,
    (athleteTherapy) => athleteTherapy
  )
  therapies?: Therapy[]

  @OneToOne(() => Modality)
  @JoinColumn()
  modality: Modality
}
