import { Athlete } from '../../athletes/entities/athlete.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
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

  @OneToMany(() => Appointment, (appointment) => appointment.created_by)
  appointments: Appointment[];

  // @OneToMany(() => Appointment, (assing) => assing.assigned_to)
  // assing_appointment: Appointment[];

  @OneToMany(() => Discipline, (discipline) => discipline.created_by)
  discipline: Discipline

  @JoinColumn({ name: 'created_by' })
  @ManyToOne(() => User, (user) => user.users)
  created_by: User

  @OneToMany(() => User, (user) => user.created_by)
  users: User[];

  @OneToMany(() => Therapy, (therapy) => therapy.created_by)
  therapies?: Therapy[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.created_by)
  evaluations?: Evaluation[];

  // @OneToMany(() => Evaluation, (assing) => assing.assigned_to)
  // assing_evaluation: Evaluation[];
}
