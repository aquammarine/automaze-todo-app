import { Optional } from '@nestjs/common';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @Optional()
  title?: string;

  @IsString()
  @Optional()
  description?: string;

  @IsNumber()
  @Optional()
  priority?: number;

  @IsBoolean()
  @Optional()
  completed?: boolean;
}
