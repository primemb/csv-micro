import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from '@app/common';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(user: CreateUserDto) {
    const existingUser = await this.databaseService.user.findFirst({
      where: {
        OR: [{ email: user.email }, { phone: user.phone }],
      },
    });
    if (!existingUser) {
      return this.databaseService.user.create({
        data: user,
      });
    }
    return existingUser;
  }

  async createUserList(users: CreateUserDto[]) {
    const existingUsers = await this.databaseService.user.findMany({
      where: {
        OR: [
          { email: { in: users.map((user) => user.email) } },
          { phone: { in: users.map((user) => user.phone) } },
        ],
      },
    });
    const newUsers = users.filter(
      (user) =>
        !existingUsers.some(
          (existingUser) =>
            existingUser.email === user.email ||
            existingUser.phone === user.phone,
        ),
    );
    if (newUsers.length > 0) {
      return this.databaseService.user.createMany({
        data: newUsers,
      });
    }
    return {
      message: 'Users already exist',
    };
  }
}
