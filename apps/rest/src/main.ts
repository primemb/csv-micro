import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { RabbitClient } from '@app/common/rabbit-client/rabbit.client';

async function bootstrap() {
  try {
    const app = await NestFactory.create(RestModule);
    const configService = app.get(ConfigService);
    app.enableCors();

    app.useGlobalPipes(new ValidationPipe());

    const port = configService.get<number>('PORT');
    const rabbitClient = app.get(RabbitClient);

    await app.listen(port || 3001, () => {
      console.log(`Server is running on port ${port || 3001}`);
      rabbitClient.connect();
    });
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
