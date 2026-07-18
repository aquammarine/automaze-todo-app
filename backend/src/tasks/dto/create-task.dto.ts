import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Milk, eggs, bread' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 10 })
  @IsInt()
  @Min(1)
  @Max(10)
  priority!: number;

  @ApiPropertyOptional({ example: '2026-07-25T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
