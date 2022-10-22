import { Department } from './../enum/functionary.enum';
import { IsAlpha, IsEnum, IsUUID } from 'class-validator';

export class CreateFunctionaryDto {
  @IsUUID()
  id: string;

  @IsAlpha()
  name: string;

  @IsEnum(Department)
  department: Department;
}
