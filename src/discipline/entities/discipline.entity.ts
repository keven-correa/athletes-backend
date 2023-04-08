import { Athlete } from '../../athletes/entities/athlete.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('Disciplines')
export class Discipline {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column({ type: 'varchar', length: 550, nullable: true, unique: true })
  description?: string;

  // @ManyToOne(() => Athlete, (athlete) => athlete.discipline)
  @OneToMany(() => Athlete, (disciplineAthlete) => disciplineAthlete.discipline)
  athletes: Athlete[];

  @CreateDateColumn({ type: 'timestamptz', default: () => `timezone('America/Santo_Domingo', now())`   })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => `timezone('America/Santo_Domingo', now())`   })
  updated_at: Date;

  @JoinColumn({ name: 'created_by' })
  @ManyToOne(() => User, (user) => user.discipline, { eager: true })
  created_by: User;

  @JoinColumn({ name: 'updated_by' })
  @ManyToOne(() => User, (user) => user.discipline, { eager: true })
  updated_by: User;
}
