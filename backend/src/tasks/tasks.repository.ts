import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/database/prisma.service';
import { Prisma, TaskUncheckedCreateInput } from 'generated/prisma/models';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: TaskUncheckedCreateInput) {
    return this.prisma.task.create({ data });
  }

  update(id: string, userId: string, data: Prisma.TaskUncheckedUpdateInput) {
    return this.prisma.task.update({
      where: { id, userId },
      data,
    });
  }
}
