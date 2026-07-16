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

  update(id: string, userId: string, data: TaskUncheckedUpdateInput) {
    return this.prisma.task.update({
      where: { id, userId },
      data,
    });
  }

  delete(id: string, userId: string) {
    return this.prisma.task.delete({
      where: { id, userId },
    });
  }

  findById(id: string, userId: string) {
    return this.prisma.task.findUnique({
      where: { id, userId },
    });
  }

  findAll(userId: string) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }
}
