import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitClient implements OnModuleDestroy {
  private readonly logger = new Logger(RabbitClient.name);
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

  async connect() {
    try {
      await this.client.connect();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
    }
  }

  async emit(pattern: string, data: any) {
    return this.client.emit(pattern, data);
  }

  async send(pattern: string, data: any) {
    return this.client.send(pattern, data);
  }
}
