import { Global, Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [QueueService, ConfigService],
  exports: [QueueService],
})
export class QueueModule {}
