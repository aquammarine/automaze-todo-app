import { Optional } from '@nestjs/common';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @Optional()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  priority!: number;
}
