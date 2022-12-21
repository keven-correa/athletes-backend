// import { Doctor } from '../../doctor/entities/doctor.entity';
import { User } from '../../auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Athlete } from '../../athletes/entities/athlete.entity';

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

  @JoinColumn({ name: 'created_by' })
  @ManyToOne(() => User, (user) => user.evaluations)
  created_by: User;

  @JoinColumn({ name: 'assigned_to' })
  @ManyToOne(() => User, (assingned) => assingned.assing_evaluation)
  assigned_to: User;

  @ManyToOne(
    () => Athlete,
    (athleteEvaluation) => athleteEvaluation.evaluations,
  )
  athlete: Athlete;
}
