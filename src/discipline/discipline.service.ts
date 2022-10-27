import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { Discipline } from './entities/discipline.entity';

@Injectable()
export class DisciplineService {
  constructor(
    @InjectRepository(Discipline)
    private readonly disciplineRepository: Repository<Discipline>,
  ) {}
  async create(createDisciplineDto: CreateDisciplineDto, createdBy: User) {
    try {
      const createdDiscipline = this.disciplineRepository.create({
        ...createDisciplineDto,
        createdBy,
      });
      this.disciplineRepository.save(createdDiscipline);
      return createdDiscipline;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.disciplineRepository.find();
  }

  async findOne(id: number) {
    return await this.disciplineRepository.findOneBy({ id: id });
  }

  async update(id: number, updateDisciplineDto: UpdateDisciplineDto) {
    const discipline = await this.disciplineRepository.preload({
      id: id,
      ...updateDisciplineDto,
    });

    await this.disciplineRepository.save(discipline);
  }

  remove(id: number) {
    return `This action removes a #${id} discipline`;
  }
}
