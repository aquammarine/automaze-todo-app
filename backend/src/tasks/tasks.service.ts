import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(dto: CreateTaskDto, userId: string) {
    return await this.tasksRepository.create({ ...dto, userId });
  }

  async update(id: string, userId: string, dto: UpdateTaskDto) {
    try {
      return await this.tasksRepository.update(id, userId, dto);
    } catch {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }
}
