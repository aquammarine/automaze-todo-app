import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/database/prisma.service';
import {
  TaskUncheckedCreateInput,
  TaskUncheckedUpdateInput,
} from 'generated/prisma/models';

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

  findAll(userId: string, completed?: boolean, title?: string) {
    return this.prisma.task.findMany({
      where: {
        userId,
        ...(completed !== undefined && { completed }),
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
      },
    });
  }
}
