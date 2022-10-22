import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FunctionaryService } from './functionary.service';
import { CreateFunctionaryDto } from './dto/create-functionary.dto';
import { UpdateFunctionaryDto } from './dto/update-functionary.dto';

@Controller('functionary')
export class FunctionaryController {
  constructor(private readonly functionaryService: FunctionaryService) {}

  @Get()
  showMessage(): string {
    return 'Here comes the Functionary';
  }

  @Post()
  create(@Body() createFunctionaryDto: CreateFunctionaryDto) {
    return this.functionaryService.create(createFunctionaryDto);
  }

  @Get('/list')
  findAll() {
    return this.functionaryService.findAll();
  }

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.functionaryService.findOneById(id);
  }

  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.functionaryService.findOneByName(name);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateFunctionaryDto: UpdateFunctionaryDto,
  ) {
    return this.functionaryService.update(id, updateFunctionaryDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.functionaryService.remove(id);
  }
}
