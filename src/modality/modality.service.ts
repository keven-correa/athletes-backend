import { Injectable } from '@nestjs/common';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';

@Injectable()
export class ModalityService {
  create(createModalityDto: CreateModalityDto) {
    return 'This action adds a new modality';
  }

  findAll() {
    return `This action returns all modality`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modality`;
  }

  update(id: number, updateModalityDto: UpdateModalityDto) {
    return `This action updates a #${id} modality`;
  }

  remove(id: number) {
    return `This action removes a #${id} modality`;
  }
}
