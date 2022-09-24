import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/user.roles";

@Entity('Users')
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text')
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.Secretary
    })
    role: Role;

}
