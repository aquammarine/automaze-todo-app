import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { email: string; password: string }) {
    return await this.prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
