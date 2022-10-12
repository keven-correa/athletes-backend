import { Athlete } from "../../athletes/entities/athlete.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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
    athletes: Athlete[]

}
