import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AthletesService } from '../athletes/athletes.service';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(AthletesService)
    private readonly athleteService: AthletesService,
  ) {}
  async create(createEvaluationDto: CreateEvaluationDto, user: User) {
    // const assingADoctor = await this.authService.getUserPhysiotherapistById(
    //   createEvaluationDto.assigned_to,
    // );
    const athlete = await this.athleteService.findOne(
      createEvaluationDto.athlete,
    );
    // if (!assingADoctor) {
    //   throw new NotFoundException(
    //     `Doctor with id: ${createEvaluationDto.assigned_to} not found!`,
    //   );
    // }
    if (!athlete) {
      throw new NotFoundException(
        `Athlete with id: ${createEvaluationDto.athlete} not found!`,
      );
    }
    const createEvaluation = this.evaluationRepository.create({
      ...createEvaluationDto,
      created_by: user,
      athlete: athlete,
      // assigned_to: assingADoctor,
    });
    await this.evaluationRepository.save(createEvaluation);
    // if (!createEvaluation.assigned_to) throw new BadRequestException();
    if (!createEvaluation.athlete) throw new BadRequestException();
    return await this.evaluationRepository.findOneBy({
      id: createEvaluation.id,
    });
  }

  async findAll() {
    return await this.evaluationRepository.find();
  }

  async findOne(id: number) {
    const athlete = await this.evaluationRepository.findOneBy({ id: id });
    if (!athlete) throw new NotFoundException();
    return athlete;
  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    const athlete = await this.athleteService.findOne(
      updateEvaluationDto.athlete,
    )
    if (!athlete) {
      throw new NotFoundException(
        `Athlete with id: ${updateEvaluationDto.athlete} not found!`,
      );
    }

    const evaluation = await this.evaluationRepository.preload({
      id: id,
      ...updateEvaluationDto,
      athlete: athlete
    });

    return evaluation;
  }

  async remove(id: number) {
    const deleteEvaluation = await this.evaluationRepository.delete(id);
    return deleteEvaluation;
  }
}
