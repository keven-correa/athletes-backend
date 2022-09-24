import { Athlete } from '../../athletes/entities/athlete.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Appointments')
export class Appointment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  reason: string;

  @Column('varchar')
  diagnostic: string;

  @Column('varchar')
  notes: string;

  @ManyToOne(() => Athlete, (athlete) => athlete.appointments)
  athlete: Athlete;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;
}
