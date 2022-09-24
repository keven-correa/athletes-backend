import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { Athlete } from './entities/athlete.entity';
import { validate as isUUID } from 'uuid';
import { isInt } from 'class-validator';

@Injectable()
export class AthletesService {
  private readonly logger = new Logger('AthleteService');

  constructor(
    @InjectRepository(Athlete)
    private readonly athleteRepository: Repository<Athlete>,
  ) {}

  async create(createAthleteDto: CreateAthleteDto) {
    try {
      const athlete = this.athleteRepository.create(createAthleteDto);
      await this.athleteRepository.save(athlete);
      return athlete;
    } catch (error) {
      this.handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.athleteRepository.find({
      take: limit,
      skip: offset,
    });
  }
  async findOne(id: number){
    let athlete: Athlete;
    athlete = await this.athleteRepository.findOneBy({id: id});
    if (!athlete) {
      throw new NotFoundException(
        `The Athlete with id: ${id} not found or dosen't exist.`,
      );
    }
    return athlete;
  }
  // async findOne(searchParam: string | number) {
  //   let athlete: Athletes;
  //   if (isInt(searchParam)) {
  //     athlete = await this.athleteRepository.findOneBy({ id: searchParam });
  //   } else {
  //     const queryBuilder = this.athleteRepository.createQueryBuilder();
  //     athlete = await queryBuilder
  //       .where('UPPER(name) =:name or document =:document', {
  //         name: searchParam.toUpperCase(),
  //         document: searchParam,
  //       })
  //       .getOne();
  //   }

  //   if (!athlete) {
  //     throw new NotFoundException(
  //       `The Athlete with search term ${searchParam} not found or dosen't exist.`,
  //     );
  //   }
  //   return athlete;
  // }

  async update(id: number, updateAthleteDto: UpdateAthleteDto) {
    const athlete = await this.athleteRepository.preload({
      id: id,
      ...updateAthleteDto,
    });
    if (!athlete) {
      throw new NotFoundException(`The athlete with id: ${id} not found.`);
    }
    try {
      await this.athleteRepository.save(athlete);
      return athlete;
    } catch (error) {
      this.handleDbException(error);
    }
  }

  async remove(id: number) {
    const athleteExists = this.findOne(id);
    if (!athleteExists)
      throw new NotFoundException(`The athlete with id: ${id} not found.`);
    await this.athleteRepository.delete(id);
    return 'Deleted';
  }

  private handleDbException(error: any) {
    this.logger.error(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    } else {
      throw new InternalServerErrorException(
        'Unexpected error. Check server logs!',
      );
    }
  }
}
