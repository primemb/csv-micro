import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port || 3001, () => {
    console.log(`Server is running on port ${port || 3000}`);
  });
}
bootstrap();
