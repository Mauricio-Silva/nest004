import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFunctionaryDto } from './dto/create-functionary.dto';
import { UpdateFunctionaryDto } from './dto/update-functionary.dto';
import { Functionary } from './entities/functionary.entity';

@Injectable()
export class FunctionaryService {
  constructor(
    @InjectRepository(Functionary)
    private functionaryRepository: Repository<Functionary>,
  ) {}

  async create(
    createFunctionaryDto: CreateFunctionaryDto,
  ): Promise<CreateFunctionaryDto> {
    try {
      await this.functionaryRepository.save(createFunctionaryDto);
      delete createFunctionaryDto.id;
      return createFunctionaryDto;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in saving functionary in database',
      );
    }
  }

  async findAll(): Promise<Functionary[]> {
    try {
      return await this.functionaryRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Impossible to find all functionaries',
      );
    }
  }

  async findOneById(id: string): Promise<Functionary> {
    const functionary = this.functionaryRepository
      .createQueryBuilder('functionary')
      .select(['functionary.name', 'functionary.department'])
      .where('functionary.id = :id', { id: id })
      .getOne();
    if (!functionary) throw new NotFoundException('Functionary not found');
    return functionary;
  }

  async findOneByName(name: string): Promise<Functionary> {
    const functionary = this.functionaryRepository
      .createQueryBuilder('functionary')
      .select(['functionary.name', 'functionary.department'])
      .where('functionary.name = :name', { name: name })
      .getOne();
    if (!functionary) throw new NotFoundException('Functionary not found');
    return functionary;
  }

  async update(
    id: string,
    updateFunctionaryDto: UpdateFunctionaryDto,
  ): Promise<Functionary> {
    const functionary = await this.functionaryRepository.findOneBy({ id });
    const { name, department } = updateFunctionaryDto;
    functionary.name = name ? name : functionary.name;
    functionary.department = department ? department : functionary.department;
    try {
      await this.functionaryRepository.save(functionary);
      return this.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in updating the actor in database',
      );
    }
  }

  async remove(id: string): Promise<string> {
    const deleteAction = await this.functionaryRepository.delete({ id });
    if (deleteAction.affected === 0) {
      throw new NotFoundException(
        'Not found a functionary with the informed ID',
      );
    }
    return 'The functionary has been removed';
  }
}
