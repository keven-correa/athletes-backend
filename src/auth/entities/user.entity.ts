import { Athlete } from '../../athletes/entities/athlete.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/user.roles';
import { Discipline } from '../../discipline/entities/discipline.entity';
// import { Doctor } from '../../doctor/entities/doctor.entity';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { Therapy } from '../../therapy/entities/therapy.entity';
import { Evaluation } from '../../evaluation/entities/evaluation.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Admin,
  })
  role: Role;

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

  @OneToMany(() => Athlete, (athlete) => athlete.created_by)
  athlete: Athlete[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
  // @OneToMany(() => Doctor, (doctor) => doctor.created_by)
  // doctor: Doctor[]

  // @OneToMany(() => Doctor, (doctor) => doctor.updated_by)
  // doctor_updated_by: Doctor

  @OneToMany(() => Discipline, (discipline) => discipline.created_by)
  discipline: Discipline

  @ManyToOne(() => User, (user) => user.users)
  created_by: User

  @JoinColumn({ name: 'created_by' })
  @OneToMany(() => User, (user) => user.created_by)
  users: User[];

  @OneToMany(() => Therapy, (therapy) => therapy.user)
  therapies?: Therapy[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.user)
  evaluations?: Evaluation[];
}
