import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { RestService } from './rest.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [RestController],
  providers: [RestService],
})
export class RestModule {}
