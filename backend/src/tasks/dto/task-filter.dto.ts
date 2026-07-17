import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CompletionFilter } from '../enums/completion-filter.enum';
import { SortOrder } from '../enums/sort-order.enum';

export class TaskFilterDto {
  @IsEnum(CompletionFilter)
  @IsOptional()
  completion?: CompletionFilter = CompletionFilter.ALL;

  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  priorityOrder?: SortOrder;
}
