import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Buy groceries' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Milk, eggs, bread' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 5, minimum: 1, maximum: 10 })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  priority?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
