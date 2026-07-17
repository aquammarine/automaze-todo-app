import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './infra/cache/redis/redis.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), PrismaModule, AuthModule, RedisModule, UsersModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
