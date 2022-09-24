import { Athlete } from '../../athletes/entities/athlete.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity('Therapies')
export class Therapy {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.therapies)
  athlete: Athlete;

  @ManyToOne(() => Doctor, (doctor) => doctor.therapies)
  doctor: Doctor;
}
