import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RabbitClient } from '@app/common/rabbit-client/rabbit.client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const rabbitClient = app.get(RabbitClient);
  await app.listen(port || 3001, () => {
    console.log(`Server is running on port ${port || 3000}`);
    rabbitClient.connect();
  });
}
bootstrap();
