import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from '@app/common';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(user: CreateUserDto) {
    return this.databaseService.user.create({
      data: user,
    });
  }
}
