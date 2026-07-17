import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/database/prisma.service';
import {
  TaskUncheckedCreateInput,
  TaskUncheckedUpdateInput,
} from 'generated/prisma/models';
import { FindAllRepositoryOptions } from './interfaces/find-all-options.interface';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: TaskUncheckedCreateInput) {
    return this.prisma.task.create({ data });
  }

  async update(id: string, userId: string, data: TaskUncheckedUpdateInput) {
    const task = await this.prisma.task.findFirst({ where: { id, userId } });
    if (!task) return null;
    return this.prisma.task.update({ where: { id }, data });
  }

  delete(id: string, userId: string) {
    return this.prisma.task.deleteMany({
      where: { id, userId },
    });
  }

  findById(id: string, userId: string) {
    return this.prisma.task.findFirst({
      where: { id, userId },
    });
  }

  findAll(userId: string, options: FindAllRepositoryOptions = {}) {
    const { completed, title, priorityOrder } = options;
    return this.prisma.task.findMany({
      where: {
        userId,
        ...(completed !== undefined && { completed }),
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
      },
      ...(priorityOrder && { orderBy: { priority: priorityOrder } }),
    });
  }
}
