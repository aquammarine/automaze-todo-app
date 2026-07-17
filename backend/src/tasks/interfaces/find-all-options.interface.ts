import { CompletionFilter } from '../enums/completion-filter.enum';
import { SortOrder } from '../enums/sort-order.enum';

export interface FindAllOptions {
  completion?: CompletionFilter;
  title?: string;
  priorityOrder?: SortOrder;
}

export interface FindAllRepositoryOptions {
  completed?: boolean;
  title?: string;
  priorityOrder?: SortOrder;
}
