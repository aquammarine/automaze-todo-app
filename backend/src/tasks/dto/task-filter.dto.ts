import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CompletionFilter } from '../enums/completion-filter.enum';
import { SortOrder } from '../enums/sort-order.enum';

export class TaskFilterDto {
  @ApiPropertyOptional({ enum: CompletionFilter, default: CompletionFilter.ALL })
  @IsEnum(CompletionFilter)
  @IsOptional()
  completion?: CompletionFilter = CompletionFilter.ALL;

  @ApiPropertyOptional({ example: 'groceries' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ enum: SortOrder })
  @IsEnum(SortOrder)
  @IsOptional()
  priorityOrder?: SortOrder;
}
