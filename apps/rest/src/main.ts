import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(RestModule);
    const configService = app.get(ConfigService);
    app.enableCors();

    app.useGlobalPipes(new ValidationPipe());

    const port = configService.get<number>('PORT');

    await app.listen(port || 3001, () => {
      console.log(`Server is running on port ${port || 3001}`);
    });
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
