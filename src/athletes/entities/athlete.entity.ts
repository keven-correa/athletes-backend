import { Appointment } from '../../appointment/entities/appointment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  BloodType,
  Gender,
  LevelOfSchooling,
  MaritalStatus,
  
} from '../enums/enum';
import { Therapy } from '../../therapy/entities/therapy.entity';
import { Evaluation } from '../../evaluation/entities/evaluation.entity';
import { Discipline } from '../../discipline/entities/discipline.entity';
import { User } from '../../auth/entities/user.entity';
import { Shift } from '../../shifts/entities/shift.entity';

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

  // @Column({ type: 'enum', enum: PatientType })
  // patientType: PatientType;

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
  // new
  @Column('varchar', {nullable: true})
  birthPlace: string;

  @Column({type: 'enum', enum: Gender, nullable: true})
  gender: Gender;

  @Column('date', {nullable: true})
  sportAge: Date;

  @Column('int', {nullable: true})
  practiceHours: number;

  @Column('varchar', {nullable: true})
  practiceDays: string

  @Column('varchar', {nullable: true})
  medicalInsurance: string

  @Column('int', {nullable: true})
  studyHours: number

  @Column('varchar', {nullable: true})
  studyDays: string

  @Column('varchar', {nullable: true})
  TA: string

  @Column('varchar', {nullable: true})
  FC: string

  @Column('varchar', {nullable: true})
  FR: string

  // @Column('varchar', {nullable: true})
  // temperature: string

  @OneToMany(
    () => Appointment,
    (athleteAppointment) => athleteAppointment.athlete,
  )
  appointments?: Appointment[];

  @OneToMany(() => Shift, (shiftAthlete) => shiftAthlete.athlete)
  shifts?: Shift[];

  @OneToMany(() => Therapy, (athleteTherapy) => athleteTherapy.athlete)
  therapies?: Therapy[];

  @OneToMany(() => Evaluation, (athleteEvaluation) => athleteEvaluation.athlete)
  evaluations?: Evaluation[];

  // @OneToMany(() => Discipline, (athleteDiscipline) => athleteDiscipline.athlete)
  // @ManyToOne(() => Athlete, (athlete) => athlete.discipline)
  @ManyToOne(() => Discipline, (discipline) => discipline.athletes)
  discipline: Discipline;

  @JoinColumn({ name: 'created_by' })
  @ManyToOne(() => User, (user) => user.athlete, { eager: true })
  created_by: User;

  @JoinColumn({name: 'updated_by'})
  @ManyToOne(() => User, (user) => user.athlete, {eager: true})
  updated_by: User;

  // @Column({name: "created_by"})
  // created_by: number;
}
