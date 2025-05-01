import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { RestService } from './rest.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitClientModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitClientModule,
  ],
  controllers: [RestController],
  providers: [RestService],
})
export class RestModule {}
