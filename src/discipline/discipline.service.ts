import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { Discipline } from './entities/discipline.entity';

@Injectable()
export class DisciplineService {
  constructor(
    @InjectRepository(Discipline)
    private readonly disciplineRepository: Repository<Discipline>
  ){}
  async create(createDisciplineDto: CreateDisciplineDto) {
    try {
      const createdDiscipline = this.disciplineRepository.create({...createDisciplineDto});
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
    return await this.disciplineRepository.findOneBy({id: id});
  }

  update(id: number, updateDisciplineDto: UpdateDisciplineDto) {
    return `This action updates a #${id} discipline`;
  }

  remove(id: number) {
    return `This action removes a #${id} discipline`;
  }
}
