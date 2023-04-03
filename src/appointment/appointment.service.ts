import {
  BadRequestException,
  HttpCode,
  Inject,
  Injectable,
  Logger,
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
  private readonly logger = new Logger('Appointment Service');
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(AthletesService)
    private readonly athleteService: AthletesService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, createdBy: User) {
    const athlete = await this.athleteService.findOne(
      createAppointmentDto.athlete,
    );

    if (!athlete) throw new NotFoundException();

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      created_by: createdBy,
      athlete: athlete,
    });
    if (!appointment.athlete) throw new BadRequestException();

    await this.appointmentRepository.save(appointment);
    return await this.findOne(appointment.id);
  }

  async findAll() {
    try {
      return await this.appointmentRepository
        .createQueryBuilder('appointment')
        // .addSelect(['appointment.id', 'appointment.reason', 'appointment.dignostic', 'appointment.notes', 'appointment.priority'])
        .leftJoin('appointment.athlete', 'athlete',)
        .addSelect(['athlete.id', 'athlete.name', 'athlete.lastName'])
        .leftJoin('athlete.discipline', 'discipline')
        .addSelect(['discipline.id', 'discipline.name'])
        .leftJoin('appointment.created_by', 'created')
        .addSelect([
          'created.id',
          'created.firstName',
          'created.lastName',
          'created.role',
        ])
        .orderBy('appointment.id', 'DESC')
        .cache(4500)
        .getMany();
    } catch (error: any) {
      this.logger.error(error);
    }
  }

  async findOne(id: number) {
    const validate = await this.validateIfAppointmetExists(id);
    if (!validate) throw new NotFoundException();
    const appointment = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoin('appointment.athlete', 'athlete')
      .addSelect(['athlete.id', 'athlete.name', 'athlete.lastName'])
      .leftJoin('athlete.discipline', 'discipline')
      .addSelect(['discipline.id', 'discipline.name'])
      .leftJoin('appointment.created_by', 'created')
      .addSelect([
        'created.id',
        'created.firstName',
        'created.lastName',
        'created.role',
      ])
      .where('appointment.id =:id', { id: id })
      .getOne();
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const validate = await this.validateIfAppointmetExists(id);
    if (!validate) throw new NotFoundException();

    const athlete = await this.athleteService.findOne(
      updateAppointmentDto.athlete,
    );

    const appointment = await this.appointmentRepository.preload({
      id: id,
      ...updateAppointmentDto,
      // assigned_to: doctor,
      athlete: athlete,
    });
    this.appointmentRepository.save(appointment);
    return appointment;
  }

  async getAppointmentsByAthleteId(id: number) {
    const validateAthlete = await this.athleteService.findOne(id);

    const appointments = await this.appointmentRepository
      .createQueryBuilder('appointments')
      // .leftJoin('appointments.assigned_to', 'assigned')
      // .addSelect(['assigned.firstName', 'assigned.lastName', 'assigned.role'])
      .leftJoin('appointments.created_by', 'created')
      .addSelect(['created.firstName', 'created.lastName', 'created.role'])
      .where('appointments.athleteId =:id', { id: validateAthlete.id })
      .getMany();
    return appointments;
  }

  async remove(id: number) {
    const deleteAppointment = await this.appointmentRepository.delete(id);
    return deleteAppointment;
  }
  private async validateIfAppointmetExists(id: number) {
    const validate = await this.appointmentRepository.findOneBy({ id: id });
    if (!validate) {
      throw new NotFoundException(`The appointmet with id: ${id} not found!`);
    }
    return validate;
  }
}
