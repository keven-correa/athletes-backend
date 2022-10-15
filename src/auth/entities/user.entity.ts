import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/user.roles';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Admin,
  })
  role: Role;
}
