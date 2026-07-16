import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CompletionFilter } from './dto/task-filter.dto';

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

  async findAll(userId: string, completion: CompletionFilter = CompletionFilter.ALL, title?: string) {
    const completed =
      completion === CompletionFilter.DONE ? true :
      completion === CompletionFilter.UNDONE ? false :
      undefined;
    return await this.tasksRepository.findAll(userId, completed, title);
  }
}
