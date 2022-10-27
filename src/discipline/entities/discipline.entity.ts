import { Athlete } from '../../athletes/entities/athlete.entity';
import {
  Column,
  Entity,
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

  @Column('varchar')
  description?: string;

  // @ManyToOne(() => Athlete, (athlete) => athlete.discipline)
  @OneToMany(() => Athlete, (disciplineAthlete) => disciplineAthlete.discipline)
  athletes: Athlete[];

  @ManyToOne(() => User, (user) => user.discipline, { eager: true })
  createdBy: User;
}
