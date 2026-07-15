import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    super({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      maxRetriesPerRequest: null,
    });

    this.on('connect', () => {
      this.logger.log('Successfully connected to Redis!');
    });

    this.on('error', (err) => {
      this.logger.log('Redis connection error:', err);
    });
  }

  async onModuleDestroy() {
    await this.quit;
  }
}
