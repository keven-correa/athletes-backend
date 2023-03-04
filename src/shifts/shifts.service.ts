import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AthletesService } from '../athletes/athletes.service';
import { Repository } from 'typeorm';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
    @Inject(AthletesService)
    private readonly athleteService: AthletesService,
  ) {}

  async create(createShiftDto: CreateShiftDto) {
    
      const athlete = await this.athleteService.findOne(createShiftDto.athlete);
      const saveShift = this.shiftRepository.create({
        athlete: athlete,
        ...CreateShiftDto,
      });
      await this.shiftRepository.save(saveShift);
      return await this.findOne(saveShift.id)
   
    
  }

  async findAll() {
    try {
      return await this.shiftRepository.find();
    } catch (error) {
      console.log;
    }
  }

  async findOne(id: number) {
    return await this.shiftRepository.findOneBy({id: id})
  }

  async update(id: number, updateShiftDto: UpdateShiftDto) {
      const updateShift = await this.shiftRepository.preload({
        id: id,
        ...updateShiftDto,
      });
      await this.shiftRepository.save(updateShift);
      return updateShift;
  }

  async remove(id: number) {
    const deleteShift = await this.shiftRepository.delete(id);
    return deleteShift;
  }
}
