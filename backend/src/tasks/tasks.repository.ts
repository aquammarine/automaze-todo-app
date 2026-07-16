import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/database/prisma.service';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  create() {}
}
