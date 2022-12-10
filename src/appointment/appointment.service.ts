import {
  BadRequestException,
  HttpStatus,
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
  async create(createAppointmentDto: CreateAppointmentDto, createdBy: User) {
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
      created_by: createdBy,
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
      .orderBy('appointment.id', 'ASC')
      .getMany();
  }

  async findOne(id: number) {
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoin('appointment.athlete', 'athlete')
      .addSelect(['athlete.name', 'athlete.lastName'])
      .leftJoin('athlete.discipline', 'discipline')
      .addSelect(['discipline.name'])
      .leftJoin('appointment.assigned_to', 'assigned')
      .addSelect(['assigned.firstName', 'assigned.lastName', 'assigned.role'])
      .where('appointment.id =:id', { id: id })
      .getOne();
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const assingTo = await this.authService.getUserPhysicianById(
      updateAppointmentDto.assigned_to,
    );
    const athleteTo = await this.athleteService.findOne(
      updateAppointmentDto.athlete,
    );
    if (!assingTo || !athleteTo) throw new NotFoundException();
    const appointment = await this.appointmentRepository.preload({
      id: id,
      ...updateAppointmentDto,
      assigned_to: assingTo,
      athlete: athleteTo,
    });
    this.appointmentRepository.save(appointment);
  }

  async remove(id: number) {
    const deleteAppointment = await this.appointmentRepository.delete(id);
    return deleteAppointment;
  }
}
