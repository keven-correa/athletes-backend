import { Athlete } from '../../athletes/entities/athlete.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Status } from '../enums/enum.therapy';
import { Evaluation } from '../../evaluation/entities/evaluation.entity';
// import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity('Therapies')
export class Therapy {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    default: () => `timezone('America/Santo_Domingo', now())`,
  })
  start_time: Date;

  @Column({
    nullable: true,
    type: 'timestamptz',
  })
  end_time: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @Column({ nullable: true, type: 'text' })
  remarks: string;

  @Column({ type: 'enum', enum: Status, default: Status.Active })
  status: Status;

  @ManyToOne(() => User, (therapist) => therapist.therapies)
  therapist: User;

  @ManyToOne(() => Athlete, (athlete) => athlete.therapies)
  athlete: Athlete;

  @ManyToOne(() => Evaluation, (evaluation) => evaluation.therapies)
  evaluation: Evaluation;

  @JoinColumn({ name: 'created_by' })
  @ManyToOne(() => User, (user) => user.therapies)
  created_by: User;
}
