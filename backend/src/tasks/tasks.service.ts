import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(dto: CreateTaskDto, userId: string) {
    return await this.tasksRepository.create({ ...dto, userId });
  }
}
