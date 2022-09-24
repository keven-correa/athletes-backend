import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import { Modality } from './entities/modality.entity';

@Injectable()
export class ModalityService {
  private readonly logger = new Logger('AthleteService');

  constructor(
    @InjectRepository(Modality)
    private readonly modalityRepository: Repository<Modality>,
  ) {}

  async create(createModalityDto: CreateModalityDto) {
    try {
      const modality = this.modalityRepository.create(createModalityDto);
      await this.modalityRepository.save(modality);
      return modality;
    } catch (error) {
      this.handleDbException(error);
    }

    return;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 15, offset = 0 } = paginationDto;
    return await this.modalityRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    let modality: Modality;
    modality = await this.modalityRepository.findOneBy({ id: id });
    if (!modality) {
      throw new NotFoundException(
        `The Modality with id: ${id} not found or dosen't exist.`,
      );
    }
    return modality;
  }

  async update(id: number, updateModalityDto: UpdateModalityDto) {
    const modality = await this.modalityRepository.preload({
      id: id,
      ...updateModalityDto,
    });
    if (!modality) {
      throw new NotFoundException(
        `The Modality with id: ${id} not found or dosen't exist.`,
      );
    }
    try {
      await this.modalityRepository.save(modality);
      return modality;
    } catch (error) {
      this.handleDbException(error);
    }
  }

  async remove(id: number) {
    const modalityExists = this.findOne(id);
    if (!modalityExists)
      throw new NotFoundException(`The modality with id: ${id} not found.`);
    await this.modalityRepository.delete(id);
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
