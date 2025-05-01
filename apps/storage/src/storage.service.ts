import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from '@app/common';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  constructor(private readonly usersService: UsersService) {}

  async createUser(user: CreateUserDto) {
    try {
      return this.usersService.createUser(user);
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityException('Failed to create user');
    }
  }
}
