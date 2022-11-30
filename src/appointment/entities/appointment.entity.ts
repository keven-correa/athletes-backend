import { Athlete } from '../../athletes/entities/athlete.entity';
// import { Doctor } from '../../doctor/entities/doctor.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

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

  @JoinColumn({name: 'assigned_to'})
  @ManyToOne(() => User, (assigned) => assigned.assing_appointment)
  assigned_to: User;

  @JoinColumn({ name: 'created_by' }) 
  @ManyToOne(() => User, (user) => user.appointments)
  created_by: User;

  @CreateDateColumn()
  created_at: Date
}
