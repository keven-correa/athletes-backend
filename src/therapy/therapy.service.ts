import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { AthletesService } from '../athletes/athletes.service';
import { AuthService } from '../auth/auth.service';
import { CreateTherapyDto } from './dto/create-therapy.dto';
import { UpdateTherapyDto } from './dto/update-therapy.dto';
import { Therapy } from './entities/therapy.entity';

@Injectable()
export class TherapyService {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(AthletesService)
    private readonly athleteService: AthletesService,
    @InjectRepository(Therapy)
    private readonly therapyRepository: Repository<Therapy>,
  ) {}
  async create(createTherapyDto: CreateTherapyDto, createdBy: User) {
    const [therapist, athlete] = await Promise.all([
      this.authService.getUserPhysiotherapistById(createTherapyDto.therapist),
      this.athleteService.findOne(createTherapyDto.athlete),
    ]);

    const therapy = this.therapyRepository.create({
      ...createTherapyDto,
      therapist: therapist,
      athlete: athlete,
      created_by: createdBy,
    });

    await this.therapyRepository.save(therapy);
    return therapy;
  }

  async findAll() {
    return await this.therapyRepository.find();
  }

  async findOne(id: number) {
    const findTherapy = await this.therapyRepository.findOneBy({id: id});
    if(!findTherapy) {
      throw new NotFoundException();
    }else{
      return findTherapy;
    }
    
  }

  // update(id: number, updateTherapyDto: UpdateTherapyDto) {
  //   return `This action updates a #${id} therapy`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} therapy`;
  // }
}
