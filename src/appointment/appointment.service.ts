import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { AthletesService } from '../athletes/athletes.service';
import { User } from '../auth/entities/user.entity';


@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(AthletesService)
    private readonly athleteService: AthletesService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const assingTo = await this.authService.getUserPhysicianById(
      createAppointmentDto.assigned_to,
    );
    const athleteTo = await this.athleteService.findOne(
      createAppointmentDto.athlete,
    );
    if (!assingTo || !athleteTo) throw new NotFoundException();

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      athlete: athleteTo,
      assigned_to: assingTo,
    });
    if (!appointment.assigned_to || !appointment.athlete)
      throw new BadRequestException();

    await this.appointmentRepository.save(appointment);
    return this.appointmentRepository.findOneBy({ id: appointment.id });
  }

  async findAll() {
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoin('appointment.athlete', 'athlete')
      .addSelect(['athlete.name', 'athlete.lastName'])
      .leftJoin('athlete.discipline', 'discipline')
      .addSelect(['discipline.name'])
      .leftJoin('appointment.assigned_to', 'assigned')
      .addSelect(['assigned.firstName', 'assigned.lastName', 'assigned.role'])
      .getMany();
  }

  async findOne(id: number) {
    // return  this.appointmentRepository.findOne({where: {id: id}, relations: ['athlete', 'assigned_to']})
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoin('appointment.athlete', 'athlete')
      .addSelect(['athlete.name', 'athlete.lastName'])
      .leftJoin('appointment.assigned_to', 'assigned')
      .addSelect(['assigned.firstName', 'assigned.lastName', 'assigned.role'])
      .where('appointment.id =:id', { id: id })
      .getOne();
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
