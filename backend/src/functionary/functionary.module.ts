import { Functionary } from './entities/functionary.entity';
import { Module } from '@nestjs/common';
import { FunctionaryService } from './functionary.service';
import { FunctionaryController } from './functionary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Functionary])],
  controllers: [FunctionaryController],
  providers: [FunctionaryService],
})
export class FunctionaryModule {}
