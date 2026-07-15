import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './infra/cache/redis/redis.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, AuthModule, RedisModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
