import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Modalities')
export class Modality {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', {
        unique: true
    })
    name: string

}
