import { Doctor } from '../../doctor/entities/doctor.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Doctor, (doctorEvaluation) => doctorEvaluation.evaluations)
  doctor: Doctor;

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

  @ManyToOne(
    () => Athlete,
    (athleteEvaluation) => athleteEvaluation.evaluations,
  )
  athlete: Athlete;
}
