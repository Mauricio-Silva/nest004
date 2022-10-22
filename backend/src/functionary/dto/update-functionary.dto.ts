import { Department } from './../enum/functionary.enum';
import { IsAlpha, IsEnum } from 'class-validator';

export class UpdateFunctionaryDto {
  @IsAlpha()
  name: string;

  @IsEnum(Department)
  department: Department;
}
