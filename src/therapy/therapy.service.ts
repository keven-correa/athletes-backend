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
import { EvaluationService } from '../evaluation/evaluation.service';

@Injectable()
export class TherapyService {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(AthletesService)
    private readonly athleteService: AthletesService,
    @Inject(EvaluationService)
    private readonly evaluathionService: EvaluationService,
    @InjectRepository(Therapy)
    private readonly therapyRepository: Repository<Therapy>,
  ) {}

  async create(createTherapyDto: CreateTherapyDto, createdBy: User) {
    const [therapist, athlete, evaluation] = await Promise.all([
      this.authService.getUserById(createTherapyDto.therapist),
      this.athleteService.findOne(createTherapyDto.athlete),
      this.evaluathionService.findOne(createTherapyDto.evaluation),
    ]);

    const therapy = this.therapyRepository.create({
      ...createTherapyDto,
      therapist: therapist,
      athlete: athlete,
      evaluation: evaluation,
      created_by: createdBy,
    });

    await this.therapyRepository.save(therapy);
    return therapy;
  }

  async findAll() {
    return await this.therapyRepository.find({ cache: 4000 });
  }

  async findOne(id: number) {
    const therapy = await this.therapyRepository
      .createQueryBuilder('therapy')
      .where('therapy.id =:id', { id: id })
      .leftJoin('therapy.evaluation', 'evaluation')
      .addSelect('evaluation.id')
      .getOne();
    return therapy;
  }
  async getTherapiesByAthleteId(id: number) {
    const validateAthlete = await this.athleteService.findOne(id);
    const therapies = await this.therapyRepository
      .createQueryBuilder('therapies')
      .where('therapies.athleteId =:id', { id: validateAthlete.id })
      .getMany();
    return therapies;
  }

  async update(id: number, updateTherapyDto: UpdateTherapyDto) {
    const therapy = await this.findOne(id);
    if (!therapy)
      throw new NotFoundException(`there is no therapy with the id: ${id}`);

    const [therapist, athlete, evaluation] = await Promise.all([
      this.authService.getUserById(updateTherapyDto.therapist),
      this.athleteService.findOne(updateTherapyDto.athlete),
      this.evaluathionService.findOne(updateTherapyDto.evaluation),
    ]);
    const updateTherapy = await this.therapyRepository.preload({
      id: id,
      ...updateTherapyDto,
      athlete: athlete,
      therapist: therapist,
      evaluation: evaluation,
    });
    await this.therapyRepository.save(updateTherapy);
    return updateTherapy;
  }
}
