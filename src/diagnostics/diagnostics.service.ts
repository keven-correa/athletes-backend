import { Injectable } from '@nestjs/common';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';
import { Repository } from 'typeorm';
import { Diagnostic } from './entities/diagnostic.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiagnosticsService {
  constructor(
    @InjectRepository(Diagnostic)
    private readonly diagnosticRepository: Repository<Diagnostic>,
  ) {}
  async create(createDiagnosticDto: CreateDiagnosticDto) {
    const dx = this.diagnosticRepository.create(createDiagnosticDto);
    await this.diagnosticRepository.save(dx);
    return dx;
  }

  async findAll() {
    return await this.diagnosticRepository.find({})
  }

  async findOne(id: number) {
    return await this.diagnosticRepository.findOneBy({id: id})
  }

  update(id: number, updateDiagnosticDto: UpdateDiagnosticDto) {
    return `This action updates a #${id} diagnostic`;
  }

  remove(id: number) {
    return `This action removes a #${id} diagnostic`;
  }
}
