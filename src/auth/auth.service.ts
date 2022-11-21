import { Injectable, UnauthorizedException } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto, user: User) {
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
      // created,
      token: this.getJwtToken({ id: userCreate.id }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
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

  async getAllUsers(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto;
    return this.userRepository.find({
      take: limit,
      skip: offset,
      relations: ['created_by'],
    });
  }

  async inactivateUser(id: number, inactivateUserDto: InactivateUserDto) {
    const inactivate = await this.userRepository.preload({
      id: id,
      ...inactivateUserDto,
    });
    await this.userRepository.save(inactivate);
    return inactivate;
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
