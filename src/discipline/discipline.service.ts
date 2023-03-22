import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { Discipline } from './entities/discipline.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class DisciplineService {
  constructor(
    @InjectRepository(Discipline)
    private readonly disciplineRepository: Repository<Discipline>,
  ) {}
  async create(createDisciplineDto: CreateDisciplineDto, user: User) {
    try {
      const createdDiscipline = this.disciplineRepository.create({
        ...createDisciplineDto,
        created_by: user,
      });
      this.disciplineRepository.save(createdDiscipline);
      return createdDiscipline;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.disciplineRepository.find({
      take: limit,
      skip: offset,
      cache: 3200,
    });
  }

  async findOne(id: number) {
    const discipline = await this.disciplineRepository.findOneBy({ id: id });
    if (!discipline) throw new NotFoundException();
    return discipline;
  }

  async update(
    id: number,
    updateDisciplineDto: UpdateDisciplineDto,
    user: User,
  ) {
    const discipline = await this.disciplineRepository.preload({
      id: id,
      ...updateDisciplineDto,
      updated_by: user,
    });

    await this.disciplineRepository.save(discipline);
  }

  //report
  async getDisciplines() {
    try {
      const result = await this.disciplineRepository
        .createQueryBuilder('discipline')
        .loadRelationCountAndMap('discipline.athletes', 'discipline.athletes')
        .getMany();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} discipline`;
  }
}
