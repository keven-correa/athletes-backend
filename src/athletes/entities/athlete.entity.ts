import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BloodType, LevelOfSchooling, MaritalStatus, PatientType } from '../enums/enum';

@Entity()
export class Athletes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', {unique: true})
  document: string;

  @Column('int')
  age: number;

  @Column()
  dateOfBirth: Date;

  @Column('int')
  maritalStatus: MaritalStatus;

  @Column('int')
  patientType: PatientType;

  @Column('int')
  levelOfSchooling: LevelOfSchooling;

  @Column('text')
  address: string;

  @Column('varchar')
  cell: string;

  @Column('varchar')
  phone: string;

  @Column('int')
  bloodType: BloodType;

  @Column('float')
  weight: number;

  @Column('float')
  height: number
}
