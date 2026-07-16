import { IsEnum, IsOptional } from 'class-validator';

export enum CompletionFilter {
  ALL = 'all',
  DONE = 'done',
  UNDONE = 'undone',
}

export class TaskFilterDto {
  @IsEnum(CompletionFilter)
  @IsOptional()
  completion?: CompletionFilter = CompletionFilter.ALL;
}
