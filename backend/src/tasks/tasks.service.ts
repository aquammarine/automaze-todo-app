import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CompletionFilter } from './enums/completion-filter.enum';
import { FindAllOptions } from './interfaces/find-all-options.interface';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(dto: CreateTaskDto, userId: string) {
    return await this.tasksRepository.create({ ...dto, userId });
  }

  async update(id: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.tasksRepository.update(id, userId, dto);
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  async delete(id: string, userId: string) {
    const result = await this.tasksRepository.delete(id, userId);
    if (result.count === 0) throw new NotFoundException(`Task ${id} not found`);
  }

  async findById(id: string, userId: string) {
    const task = await this.tasksRepository.findById(id, userId);
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  async findAll(userId: string, options: FindAllOptions = {}) {
    const {
      completion = CompletionFilter.ALL,
      title,
      priorityOrder,
      dueDateOrder,
    } = options;
    const completed =
      completion === CompletionFilter.DONE
        ? true
        : completion === CompletionFilter.UNDONE
          ? false
          : undefined;
    return await this.tasksRepository.findAll(userId, {
      completed,
      title,
      priorityOrder,
      dueDateOrder,
    });
  }
}
