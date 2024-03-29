import { Athlete } from '../../athletes/entities/athlete.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { PriorityLevel } from '../enums/enum.appointment';
import { Diagnostic } from '../../diagnostics/entities/diagnostic.entity';

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

  @Column({type: 'enum', enum: PriorityLevel})
  priority?: PriorityLevel
  
  @ManyToOne(() => Athlete, (athlete) => athlete.appointments)
  athlete: Athlete;

  // @JoinColumn({name: 'assigned_to'})
  // @ManyToOne(() => User, (assigned) => assigned.assing_appointment)
  // assigned_to: User;

  @ManyToOne(() => Diagnostic, (diagnostic) => diagnostic.appointments)
  diagnostic_classification: Diagnostic;

  @Column({
    type: 'timestamptz',
  })
  start_time: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
    default: () => `timezone('America/Santo_Domingo', now())`,
  })
  end_time: Date;

  @JoinColumn({ name: 'created_by' }) 
  @ManyToOne(() => User, (user) => user.appointments)
  created_by: User;

  @CreateDateColumn() 
  created_at: Date
}
