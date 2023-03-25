import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { InactivateUserDto } from './dto/inactivate-user.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto, user: User) {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (foundUser) {
      throw new HttpException(
        'A user with this email already exists. Please enter another one.',
        HttpStatus.CONFLICT,
      );
    }

    const { password, ...userData } = createUserDto;
    const userCreate = this.userRepository.create({
      ...userData,
      password: bcrypt.hashSync(password, 10),
      created_by: user,
    });
    await this.userRepository.save(userCreate);
    delete userCreate.password;
    delete userCreate.isActive;
    return {
      ...userCreate,
      token: this.getJwtToken({ id: userCreate.id }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, role: true },
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (Email)');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (Password)');

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }
  async getUserById(id: number) {
    const find = await this.userRepository.findOneBy({ id: id });
    if (!find) throw new NotFoundException(`User with id: ${id} not found!`);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.isActive',
        'user.role',
        'user.created_at',
        'user.updated_at',
      ])
      .where('user.id = :id', { id })
      .cache(2500)
      .getOne();
    return user;
  }
  async getAllUsers(paginationDto: PaginationDto) {
    const userList = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.isActive',
        'user.role',
        'user.created_at',
        'user.updated_at',
      ])
      .leftJoin('user.created_by', 'created')
      .addSelect(['created.firstName', 'created.lastName', 'created.role'])
      .orderBy('user.id', 'ASC')
      .getMany();

    return userList;
  }

  async getAllPhysicians() {
    const physicians = await this.userRepository
      .createQueryBuilder('physicians')
      .where('physicians.role = :role', {
        role: 'MedicoGeneral',
      })
      .getMany();
    return physicians;
  }

  async getAllPhysioTherapist() {
    const physioTherapists = await this.userRepository
      .createQueryBuilder('terapist')
      .where('terapist.role = :role', {
        role: 'Fisioterapeuta',
      })
      .getMany();
    return physioTherapists;
  }

  async getAllSecretaries() {
    const secretaries = await this.userRepository
      .createQueryBuilder('secretary')
      .where('secretary.role = :role', {
        role: 'Secretary',
      })
      .getMany();
    return secretaries;
  }

  //Report
  async getUserPhysicianById(id: number) {
    const find = await this.userRepository.findOneBy({ id: id });
    if (!find)
      throw new NotFoundException(`Physician with id: ${id} not found!`);
    const physician = await this.userRepository
    .createQueryBuilder('user')
    .select([
      'user.id',
      'user.firstName',
      'user.lastName',
      'user.email',
      'user.isActive',
      'user.role',
    ])
      .where('user.id =:id', {
        id: id,
      })
      .andWhere('user.role = :role', {
        role: 'MedicoGeneral',
      })
      .andWhere('user.isActive = :isActive', {
        isActive: true,
      })
      .leftJoin('user.appointments', 'appointments')
      .addSelect([
        'appointments.id',
        'appointments.reason',
        'appointments.diagnostic',
        'appointments.notes',
      ])
      .leftJoin('appointments.athlete', 'athlete')
      .addSelect(['athlete.id', 'athlete.name', 'athlete.lastName'])
      .leftJoin('athlete.discipline', 'discipline')
      .addSelect('discipline.name')
      .getMany();
    return physician;
  }

  async getAthletesWithDisciplineCount(id: number){
    const physicians = await this.userRepository
    .createQueryBuilder('user')
    .select([
      'user.id',
      'user.firstName',
      'user.lastName',
      'user.email',
      'user.isActive',
      'user.role',
      'COUNT(athlete.id) AS athleteCount',
      'discipline.name AS disciplineName'
    ])
    .where('user.id =:id', {
          id: id,
        })
    .andWhere('user.role = :role', {
      role: 'MedicoGeneral',
    })
    .andWhere('user.isActive = :isActive', {
      isActive: true,
    })
    .leftJoin('user.appointments', 'appointments')
    .leftJoin('appointments.athlete', 'athlete')
    .leftJoin('athlete.discipline', 'discipline')
    .groupBy('user.id, discipline.id')
    .getRawMany();
  return physicians;
  }

  async getUserPhysiotherapistById(id: number) {
    const find = await this.userRepository.findOneBy({ id: id });
    if (!find)
      throw new NotFoundException(`Therapist with id: ${id} not found!`);
    const physiotherapist = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id =:id', {
        id: id,
      })
      .andWhere('user.role = :role', {
        role: 'Fisioterapeuta',
      })
      .andWhere('user.isActive = :isActive', {
        isActive: true,
      })
      .getOne();
    return physiotherapist;
  }

  async inactivateUser(id: number, inactivateUserDto: InactivateUserDto) {
    const find = await this.userRepository.findOneBy({ id: id });
    if (!find) throw new NotFoundException(`User with id: ${id} not found!`);
    const inactivate = await this.userRepository.preload({
      id: id,
      ...inactivateUserDto,
    });
    await this.userRepository.save(inactivate);
    return inactivate;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const find = await this.userRepository.findOneBy({ id: id });
    if (!find) throw new NotFoundException(`User with id: ${id} not found!`);
    const inactivate = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    await this.userRepository.save(inactivate);
    return inactivate;
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
