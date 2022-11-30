import { Athlete } from '../../athletes/entities/athlete.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
// import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity('Therapies')
export class Therapy {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.therapies)
  athlete: Athlete;

  //change to user
  // @ManyToOne(() => Doctor, (doctor) => doctor.therapies)
  // doctor: Doctor;

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
  @ManyToOne(() => User, (user) => user.therapies)
  created_by: User
}
