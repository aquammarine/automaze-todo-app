import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/database/prisma.service';
import { TaskUncheckedCreateInput } from 'generated/prisma/models';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: TaskUncheckedCreateInput) {
    return this.prisma.task.create({ data });
  }
}
