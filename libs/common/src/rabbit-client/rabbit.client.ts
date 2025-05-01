import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitClient implements OnModuleInit, OnModuleDestroy {
  private client: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('RABBITMQ_URL')],
        queue: this.configService.get('RABBITMQ_QUEUE'),
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async emit(pattern: string, data: any) {
    return this.client.emit(pattern, data);
  }

  async send(pattern: string, data: any) {
    return this.client.send(pattern, data);
  }
}
