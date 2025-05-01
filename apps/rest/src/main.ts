import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(RestModule);
  const configService = app.get(ConfigService);
  app.enableCors();

  const port = configService.get<number>('PORT');

  await app.listen(port || 3001);
}
bootstrap();
