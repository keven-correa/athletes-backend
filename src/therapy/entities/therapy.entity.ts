import { Athlete } from '../../athletes/entities/athlete.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity('Therapies')
export class Therapy {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.therapies)
  athlete: Athlete;

  @ManyToOne(() => Doctor, (doctor) => doctor.therapies)
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
}
