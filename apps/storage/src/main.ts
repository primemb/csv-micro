import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';
import {
  AsyncOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<
    AsyncOptions<MicroserviceOptions>
  >(StorageModule, {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        transport: Transport.RMQ,
        options: {
          urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
          queue: configService.getOrThrow<string>('RABBITMQ_QUEUE'),
          queueOptions: {
            durable: true,
          },
        },
      };
    },
  });

  await app.listen();
}
bootstrap();
