import { Appointment } from '../../appointment/entities/appointment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  BloodType,
  LevelOfSchooling,
  MaritalStatus,
  PatientType,
} from '../enums/enum';
import { Therapy } from '../../therapy/entities/therapy.entity';
import { Evaluation } from '../../evaluation/entities/evaluation.entity';
import { Discipline } from '../../discipline/entities/discipline.entity';

@Entity('Athletes')
export class Athlete {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', { unique: true })
  document: string;

  @Column('int')
  age: number;

  @Column()
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: MaritalStatus })
  maritalStatus: MaritalStatus;

  @Column({ type: 'enum', enum: PatientType })
  patientType: PatientType;

  @Column({ type: 'enum', enum: LevelOfSchooling })
  levelOfSchooling: LevelOfSchooling;

  @Column('text')
  address: string;

  @Column('varchar')
  cell: string;

  @Column('varchar')
  phone: string;

  @Column({ type: 'enum', enum: BloodType })
  bloodType: BloodType;

  @Column('float')
  weight: number;

  @Column('float')
  height: number;

  @Column('bool', { default: true })
  isActive: boolean;

  @OneToMany(
    () => Appointment,
    (athleteAppointment) => athleteAppointment.athlete,
  )
  appointments?: Appointment[];

  @OneToMany(() => Therapy, (athleteTherapy) => athleteTherapy.athlete)
  therapies?: Therapy[];

  @OneToMany(() => Evaluation, (athleteEvaluation) => athleteEvaluation.athlete)
  evaluations?: Evaluation[];

  // @OneToMany(() => Discipline, (athleteDiscipline) => athleteDiscipline.athlete)
  // @ManyToOne(() => Athlete, (athlete) => athlete.discipline)
  @ManyToOne(() => Discipline, (discipline) => discipline.athletes)
  discipline: Discipline;
}
