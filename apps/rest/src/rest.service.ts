import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RabbitClient } from '@app/common/rabbit-client/rabbit.client';

@Injectable()
export class RestService {
  private readonly logger = new Logger(RestService.name);

  constructor(private readonly rabbitClient: RabbitClient) {}

  async createUser(user: CreateUserDto) {
    try {
      await this.rabbitClient.emit('user.create', user);
      return {
        message: 'User submitted successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityException('Failed to create user');
    }
  }
}
