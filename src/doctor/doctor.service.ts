import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class DoctorService {
  private readonly logger = new Logger('DoctorService');
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto, user: User) {
    try {
      const doctor =  this.doctorRepository.create({
        ...createDoctorDto,
        created_by: user
      });
      await this.doctorRepository.save(doctor);
      return doctor;
    } catch (error) {
      
    }
  }

  async findAll(paginationDto: PaginationDto) {
   const {limit = 10, offset = 0} = paginationDto;
   return await this.doctorRepository.find({
    take: limit,
    skip: offset
   });
  }

  async findOne(id: number) {
    let doctor: Doctor;
    doctor = await this.doctorRepository.findOneBy({id: id});
    if(!doctor){
      throw new NotFoundException(`The doctor with id: ${id} not exists.`)
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto, user: User) {
    const athlete = await this.doctorRepository.preload({
      id: id,
      ...updateDoctorDto,
      updated_by: user
    });
    if (!athlete) {
      throw new NotFoundException(`The doctor with id: ${id} not found.`);
    }
    try {
      await this.doctorRepository.save(athlete);
      return athlete;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove(id: number) {
      const doctorExists = this.doctorRepository.findOneBy({id: id});
      if(!doctorExists){
        throw new NotFoundException(`The doctor with id: ${id} not found.`);
      }
      try {
        return await this.doctorRepository.delete(id);
      } catch (error) {
        this.logger.error(error);
      }
  }
}
